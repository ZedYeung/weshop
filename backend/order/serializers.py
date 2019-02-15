from rest_framework import serializers

import uuid
from shop.models import Product
from .models import Order, OrderProduct
from shop.serializers import ProductSerializer


class OrderProductSerialzier(serializers.ModelSerializer):
    product = ProductSerializer(many=False)
    class Meta:
        model = OrderProduct
        fields = "__all__"


class OrderDetailSerializer(serializers.ModelSerializer):
    product = OrderProductSerialzier(many=True)

    class Meta:
        model = Order
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )

    order_id = serializers.CharField(read_only=True)
    stripe_id = serializers.CharField(read_only=True)
    pay_status = serializers.CharField(read_only=True)
    pay_time = serializers.DateTimeField(read_only=True)

    def generate_order_id(self):
        return str(uuid.uuid1())

    def validate(self, attrs):
        attrs["order_id"] = self.generate_order_id()
        return attrs

    class Meta:
        model = Order
        fields = "__all__"