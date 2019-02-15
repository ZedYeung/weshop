import django_filters
from django.db.models import Q
from .models import Product


class ProductFilter(django_filters.rest_framework.FilterSet):
    """
    Product filter
    """
    min_price = django_filters.NumberFilter(field_name='price', help_text='minimum price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', help_text='maximum price', lookup_expr='lte')
    category = django_filters.NumberFilter(method='category_filter')

    def category_filter(self, queryset, name, value):
        return queryset.filter(Q(category_id=value))


    class Meta:
        model = Product
        fields = ['min_price', 'max_price']