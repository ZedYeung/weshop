from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.authentication import SessionAuthentication
from rest_framework import mixins

from .serializers import OrderDetailSerializer, OrderSerializer
from .models import Order, OrderProduct
from cart.models import Cart
# from Weshop.settings import STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY


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

            cart.delete()
        return order
