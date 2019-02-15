from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework import mixins
from rest_framework.response import Response

import stripe
from datetime import datetime
from .serializers import OrderDetailSerializer, OrderSerializer
from .models import Order, OrderProduct
from cart.models import Cart
from Weshop.settings import STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY

stripe.api_key = STRIPE_SECRET_KEY


class OrderViewset(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    """
    Order

    list:
        get all orders
    delete:
        delete order
    create：
        create order
    """
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JSONWebTokenAuthentication, SessionAuthentication)
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == "retrieve":
            return OrderDetailSerializer
        return OrderSerializer

    def perform_create(self, serializer):
        order = serializer.save()
        cart = Cart.objects.filter(user=self.request.user)
        for item in cart:
            order_product = OrderProduct()
            order_product.product = item.product
            order_product.quantity = item.quantity
            order_product.order = order
            order_product.save()

            item.delete()
        return order


class CheckoutView(APIView):
    # def get(self, request):
    #     return Response("Get")

    def post(self, request):
        # print(request.POST -- empty
        # print(request.data) -- dict
        data = request.data

        try:
            order_id = data.get('order_id', None)
            if not order_id:
                return Response("Need to create order first")

            charge = stripe.Charge.create(
                amount=int(float(data.get('amount', 0)) * 100),
                currency=data.get('currency', 'usd'),
                source=data.get('source', None),
                receipt_email=data.get('receipt_email', None),
                description=data.get('description', 'Charge for Weshop'),
                statement_descriptor=data.get('statement_descriptor', "Weshop"),
                metadata={'order_id': order_id}
            )

            stripe_id = charge.get('id', None)
            pay_status = charge.get('status', 'pending')

            existed_orders = Order.objects.filter(order_id=order_id)
            for existed_order in existed_orders:
                # order_products = existed_order.product.all()
                # for order_product in order_products:
                #     product = order_product.product
                #     product.sold_num += order_product.quantity
                #     product.save()
                existed_order.pay_status = pay_status
                existed_order.stripe_id = stripe_id
                if pay_status == 'succeeded':
                    existed_order.pay_time = datetime.now()
                existed_order.save()

            return Response(pay_status)
        except stripe.error.CardError as e:
            body = e.json_body
            err = body.get('error', {})
            print('Status is: %s' % e.http_status)
            print('Type is: %s' % err.get('type'))
            print('Code is: %s' % err.get('code'))
            print('Message is %s' % err.get('message'))
            return Response(err.get('message'))
        except stripe.error.RateLimitError as e:
            # Too many requests made to the API too quickly
            return Response("The API was not able to respond, try again.")
        except stripe.error.InvalidRequestError as e:
            # invalid parameters were supplied to Stripe's API
            return Response("Invalid parameters, unable to process payment. {}".format(e))
        except stripe.error.AuthenticationError as e:
            # Authentication with Stripe's API failed
            # (maybe you changed API keys recently)
            return Response("stripe.error.AuthenticationError {}".format(e))
        except stripe.error.APIConnectionError as e:
            # Network communication with Stripe failed
            return Response("Network communication failed, try again.")
        except stripe.error.StripeError as e:
            # Display a very generic error to the user, and maybe
            # send yourself an email
            return Response("Internal Error, contact support.")

        # Something else happened, completely unrelated to Stripe
        except Exception as e:
            return Response('Unable to process payment, try again. {}'.format(e))

