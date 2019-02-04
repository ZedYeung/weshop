import django_filters
from .models import Product


class ProductFilter(django_filters.rest_framework.FilterSet):
    """
    Product filter
    """
    min_price = django_filters.NumberFilter(field_name='price', help_text='minimum price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', help_text='maximum price', lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['min_price', 'max_price']