from django.shortcuts import render
from rest_framework import generics
from .models import Product,Warehouse,Category
from .serializers  import ProductModelSerializer, WarehouseModelSerializer, CategoryModelSerializer


# Create your views here.
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductModelSerializer 

class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductModelSerializer


class WarehouseListCreateView(generics.ListCreateAPIView):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseModelSerializer 

class WarehouseDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseModelSerializer
    
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryModelSerializer 

class CategoryDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryModelSerializer