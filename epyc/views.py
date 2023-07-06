from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import Game, Entry

from .serializers import GameSerializer, EntrySerializer

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
            serializer = GameSerializer(game, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            games = Game.objects.filter(user=request.user.id)
            serializer = GameSerializer(games, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        '''
        Create the Game with given data
        '''
        data = {
             'user': request.user.id
        }
        serializer = GameSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EntryListApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, entry_id, *args, **kwargs):
        if entry_id:
            entries = Entry.objects.filter(id=entry_id, user=request.user.id)
            serializer = EntrySerializer(entries, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            entries = Entry.objects.filter(user=request.user.id)
            serializer = EntrySerializer(entries, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    # 2. Create
    def post(self, request, *args, **kwargs):
        data = {
             'user': request.user.id,
             'sentence': request.data.get('sentence'),
             'drawing': request.data.get('drawing'),
             'sequence': request.data.get('sequence'),
             'gameId': request.data.get('gameId'),
        }
        serializer = EntrySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GameEntriesListApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, game_id, *args, **kwargs):
        game = Entry.objects.filter(game_id=game_id, user=request.user.id)
        serializer = EntrySerializer(game, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
