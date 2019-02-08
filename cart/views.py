from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import authentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .models import Cart
from .serializers import CartSerializer, CartDetailSerializer


# Create your views here.
class CartViewset(viewsets.ModelViewSet):
    """
    Cart

    list:
        get all cart items
    read:
        get specific cart item
    create:
        add item into cart
    delete:
        delete item from cart
    update:
        update specific cart item
    partial_update:
        partial update specific cart item
    """
    authentication_classes = (JSONWebTokenAuthentication, authentication.SessionAuthentication )
    permission_classes = (IsAuthenticated,)
    serializer_class = CartSerializer
    lookup_field = "product_id"

    def get_serializer_class(self):
        # if self.action == 'list' or self.action == 'retrieve':
        if self.action == 'list':
            return CartDetailSerializer
        else:
            return CartSerializer

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
