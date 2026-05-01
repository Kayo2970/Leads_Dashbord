import prisma from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CommitteesPage() {
  const committees = await prisma.committee.findMany({
    include: {
      users: true,
      tasks: true,
    }
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Committees</h1>
        <p className="text-muted-foreground mt-1">
          View organizational committees and their members.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {committees.map((committee) => (
          <Card key={committee.id} className="glass-card overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>{committee.name}</CardTitle>
                  <CardDescription>{committee.description || "Official LEADS Committee"}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-medium">{committee.users.length} Members</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckSquare className="h-4 w-4 text-primary" />
                  <span className="font-medium">{committee.tasks.length} Assigned Tasks</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Committee Members</h4>
                <div className="space-y-2">
                  {committee.users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between text-sm p-2 rounded-md bg-white/5 border border-white/5">
                      <span className="font-medium">{user.fullName}</span>
                      <span className="text-[10px] uppercase px-2 py-0.5 bg-primary/20 text-primary rounded-sm font-bold">
                        {user.role.replace("_", " ")}
                      </span>
                    </div>
                  ))}
                  {committee.users.length === 0 && (
                    <p className="text-xs text-muted-foreground italic">No members assigned yet.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {committees.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-white/20 rounded-xl glass-card">
            <Shield className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium">No committees found</h3>
            <p className="text-sm text-muted-foreground mt-1">Please seed the database to see committees.</p>
          </div>
        )}
      </div>
    </div>
  );
}
