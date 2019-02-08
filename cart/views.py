from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import authentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .models import Cart
from .serializers import CartSerializer


# Create your views here.
class CartViewset(viewsets.ModelViewSet):
    """
    Cart

    list:
        get cart detail
    create:
        add into cart
    delete:
        delete cart
    """
    authentication_classes = (JSONWebTokenAuthentication, authentication.SessionAuthentication )
    permission_classes = (IsAuthenticated,)
    serializer_class = CartSerializer
    lookup_field = "product_id"

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        cart = serializer.save()
        product = cart.product
        product.stock -= cart.quantity
        product.save()

    def perform_destroy(self, instance):
        product = instance.product
        product.stock += instance.quantity
        product.save()
        instance.delete()

    def perform_update(self, serializer):
        existed_cart = Cart.objects.get(id=serializer.instance.id)
        current_cart = serializer.save()
        product = current_cart.product
        product.stock -= current_cart.quantity - existed_cart.quantity
        product.save()
