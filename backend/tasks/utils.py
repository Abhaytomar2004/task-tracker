from .models import TaskDependency

def build_graph():
    g={}
    for d in TaskDependency.objects.all():
        g.setdefault(d.task_id,[]).append(d.depends_on_id)
    return g

def detect_cycle(g,start):
    seen=set(); stack=[]
    def dfs(n):
        if n in stack: return stack[stack.index(n):]+[n]
        if n in seen: return None
        seen.add(n); stack.append(n)
        for x in g.get(n,[]): 
            c=dfs(x)
            if c: return c
        stack.pop()
    return dfs(start)
