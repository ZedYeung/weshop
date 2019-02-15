from rest_framework.pagination import PageNumberPagination


class ProductPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    page_query_param = 'page'
    max_page_size = 100
