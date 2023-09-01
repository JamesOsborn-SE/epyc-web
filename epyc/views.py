from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Game, Entry, OneTimeUseCode
from datetime import datetime

import secrets

from .serializers import GameSerializer, EntrySerializer, OneTimeUseCodeSerializer

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken


class GameListApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, game_id, user_id):
        try:
            return Game.objects.get(id=game_id, user=user_id)
        except Game.DoesNotExist:
            return None

    def get(self, request, game_id, *args, **kwargs):
        if game_id:
            game = self.get_object(game_id, request.user.id)
            serializer = GameSerializer(game, many=False, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            games = Game.objects.filter(user=request.user.id)
            serializer = GameSerializer(games, many=True, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        """
        Create the Game with given data
        """
        data = {"user": request.user.id}
        game_serializer = GameSerializer(data=data)
        if game_serializer.is_valid():
            game_serializer.save()
            entry_data = {
                "user": request.user.id,
                "sentence": request.data.get("sentence"),
                "sequence": 0,
                "drawing": None,
                "game_id": game_serializer.data["id"],
            }
            entry_serializer = EntrySerializer(data=entry_data)
            if entry_serializer.is_valid():
                entry_serializer.save()
                game_serializer.data["entries"] = [entry_serializer.data]

            return Response(
                {
                    "id": game_serializer.data["id"],
                    "created_at": game_serializer.data["created_at"],
                    "user": game_serializer.data["user"],
                    "entries": [entry_serializer.data],
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(game_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 3. Update
    def put(self, request, *args, **kwargs):
        """
        Update the Game with given data
        """
        data = {"user": request.user.id}
        game_serializer = GameSerializer(data=data)
        if game_serializer.is_valid():
            game_serializer.save()
            entry_data = {
                "user": request.user.id,
                "sentence": request.data.get("sentence"),
                "sequence": 0,
                "drawing": None,
                "game_id": game_serializer.data["id"],
            }
            entry_serializer = EntrySerializer(data=entry_data)
            if entry_serializer.is_valid():
                entry_serializer.save()
                game_serializer.data["entries"] = [entry_serializer.data]

            return Response(
                {
                    "id": game_serializer.data["id"],
                    "created_at": game_serializer.data["created_at"],
                    "user": game_serializer.data["user"],
                    "entries": [entry_serializer.data],
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(game_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EntryListApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, entry_id, *args, **kwargs):
        if entry_id:
            entry = Entry.objects.get(id=entry_id)
            if entry.user.id == request.user.id:
                serializer = EntrySerializer(entry, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            entries = Entry.objects.filter(user=request.user.id)
            serializer = EntrySerializer(entries, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        data = {
            "user": request.user.id,
            "sentence": request.data.get("sentence"),
            "drawing": request.data.get("drawing"),
            "sequence": request.data.get("sequence"),
            "game_id": request.data.get("game_id"),
        }
        serializer = EntrySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GameEntriesListApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, game_id, *args, **kwargs):
        entries = Entry.objects.filter(game_id=game_id, user=request.user.id)
        serializer = EntrySerializer(entries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GameLastImageEntry(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, game_id, *args, **kwargs):
        last_image_entry = (
            Entry.objects.filter(game_id=game_id, user=request.user.id)
            .exclude(drawing=None)
            .order_by("sequence")
            .last()
        )
        serializer = EntrySerializer(last_image_entry, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GameLastEntry(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, game_id, *args, **kwargs):
        last_image_entry = (
            Entry.objects.filter(game_id=game_id, user=request.user.id)
            .order_by("sequence")
            .last()
        )
        serializer = EntrySerializer(last_image_entry, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GameEndApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, game_id, *args, **kwargs):
        game = Game.objects.filter(id=game_id, user=request.user.id)
        game.update(completed_at=datetime.now())

        return Response(game_id, status=status.HTTP_200_OK)


class OneTimeAccessView(APIView):
    def post(self, request, code, *args, **kwargs):
        data = OneTimeUseCode.objects.filter(code=code).first()
        expiration = data.created_at + data.expires_in
        if data and expiration.timestamp() > datetime.now().timestamp():
            user = data.user
            access_token = AccessToken.for_user(user=user)
            refresh_token = RefreshToken.for_user(user=user)
            payload = {
                "token": {
                    "access": str(access_token),
                    "refresh": str(refresh_token),
                    "user_id": access_token["user_id"],
                },
                "username": user.username,
                "path": data.path,
            }
            return Response(payload, status=status.HTTP_200_OK)
        return Response("invalid code", status=status.HTTP_404_NOT_FOUND)

    def get(self, request, *args, **kwargs):
        if not permissions.IsAuthenticated:
            return
        data = {
            "user": request.user.id,
            "entry": request.data.get("entry_id"),
            "code": secrets.token_urlsafe(12),
        }
        print(data)
        serializer = OneTimeUseCodeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
