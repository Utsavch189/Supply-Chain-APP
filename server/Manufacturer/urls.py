from django.urls import path
from .views import *

urlpatterns = [
    path('get_products',get_products),
    path('set_and_update_products',set_and_update_products),
    path('entry_production',entry_production)
]