from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Task,TaskDependency
from .serializers import TaskSerializer
from .utils import build_graph,detect_cycle

class Tasks(APIView):
    def get(self,r):
        return Response(TaskSerializer(Task.objects.all(),many=True).data)
    def post(self,r):
        s=TaskSerializer(data=r.data); s.is_valid(raise_exception=True); s.save()
        return Response(s.data)

class AddDep(APIView):
    def post(self,r,pk):
        did=r.data['depends_on_id']
        TaskDependency.objects.create(task_id=pk,depends_on_id=did)
        g=build_graph(); c=detect_cycle(g,pk)
        if c:
            TaskDependency.objects.filter(task_id=pk,depends_on_id=did).delete()
            return Response({"error":"Circular","path":c},status=400)
        return Response({"ok":True})
