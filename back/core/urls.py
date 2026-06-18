"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from inventory.views import (
ProductListCreateView,
WarehouseListCreateView,
CategoryListCreateView,
ProductDetailAPIView,
WarehouseDetailAPIView,
CategoryDetailAPIView
)

urlpatterns = [
    # http://127.0.0.1:8000/
    
    path('admin/', admin.site.urls),
    path('api/products',ProductListCreateView.as_view()),
    path('api/product/<int:pk>/',ProductDetailAPIView.as_view()),
    path('api/warehouses',WarehouseListCreateView.as_view()),
    path('api/warehouse/<int:pk>/',WarehouseDetailAPIView.as_view()),
    path('api/categories',CategoryListCreateView.as_view()),
    path('api/category/<int:pk>/',CategoryDetailAPIView.as_view())
]
