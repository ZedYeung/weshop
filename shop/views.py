from django.shortcuts import render, get_object_or_404
from rest_framework import generics, mixins, viewsets
from django.http import HttpResponse
from .models import Category, Product
from .serializer import CategorySerializer, ProductSerializer

# Create your views here.
class ProductListViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                         viewsets.GenericViewSet):
    """
    Product List
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoryViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                      viewsets.GenericViewSet):
    """
    Category
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

