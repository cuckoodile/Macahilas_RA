from rest_framework import serializers
from .models import Product,Warehouse,Category

class ProductModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','sku','description','price','name','category','warehouses']


class WarehouseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ['id','name']

class CategoryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name']

