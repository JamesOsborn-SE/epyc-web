"""
URL configuration for epyc_web project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView)

from django.urls import path
from epyc.views import (
    GameListApiView,
    EntryListApiView,
    GameEntriesListApiView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/games/', GameListApiView.as_view(), kwargs={'game_id': None}),
    path('api/games/<uuid:game_id>/', GameListApiView.as_view()),
    path('api/games/<uuid:game_id>/entries', GameEntriesListApiView.as_view()),
    path('api/entries/', EntryListApiView.as_view(), kwargs={'entry_id': None}),
    path('api/entries/<uuid:entry_id>', EntryListApiView.as_view()),
]
