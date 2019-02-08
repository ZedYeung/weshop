from rest_framework import serializers
from shop.models import Product
from shop.serializers import ProductSerializer
from .models import Cart


class CartSerializer(serializers.Serializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    quantity = serializers.IntegerField(required=True, min_value=1,
                                        error_messages={
                                            "min_value": "The quantity must greater than 0",
                                            "required": "Please input the quantity"
                                        })
    product = serializers.PrimaryKeyRelatedField(required=True, queryset=Product.objects.all())

    def create(self, validated_data):
        user = self.context["request"].user
        quantity = validated_data["quantity"]
        product = validated_data["product"]

        items = Cart.objects.filter(user=user, product=product)

        if items:
            item = items[0]
            item.quantity += quantity
            item.save()
        else:
            item = Cart.objects.create(**validated_data)

        return item

    def update(self, instance, validated_data):
        instance.quantity = validated_data["quantity"]
        instance.save()
        return instance

    