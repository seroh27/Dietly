from django.urls import include,path
from user import views
from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns = [
    path('meallist/', views.meal_list),
    path('meallist/<int:id>/<str:food>/<str:type>/<str:date>/', views.meal_user_list),
]
urlpatterns = format_suffix_patterns(urlpatterns)