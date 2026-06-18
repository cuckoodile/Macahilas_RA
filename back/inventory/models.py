from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def __str__(self):
        return self.name



class Warehouse(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    sku = models.CharField(max_length=50, unique=True, verbose_name="Stock Keeping Unit")
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    warehouses = models.ForeignKey(Warehouse,on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.sku} - {self.name}"
    