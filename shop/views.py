from django.shortcuts import render, get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework import generics, mixins, viewsets
from django.http import HttpResponse
from .models import Category, Product
from .filter import ProductFilter
from .serializer import CategorySerializer, ProductSerializer

# Create your views here.
class ProductViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                         viewsets.GenericViewSet):
    """
    Product
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filter_class = ProductFilter
    search_fields = ('name', 'description')


class CategoryViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                      viewsets.GenericViewSet):
    """
    Category
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

