import { Badge } from "@/components/atoms/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card";
import { Health } from "@/lib/interface/admin/get-webSetting";
import { CheckCircle, Database, Server, Settings } from "lucide-react";

export interface WebHealthProps {
    health: Health
    onClick?: (event: React.MouseEvent) => void

}


export function WebHealth({ health }: WebHealthProps) {
    return (
        <div className="container mx-auto py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">System Health</h1>
          <Badge variant={health.healthy ? "default" : "destructive"} className="px-3 py-1 text-sm">
            {health.healthy ? "All Systems Healthy" : "Issues Detected"}
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Environment Health Card */}
          <HealthCard
            title={health.report.env.displayName}
            healthy={health.report.env.health.healthy}
            icon={<Server className="h-5 w-5 text-primary" />}
          />

          {/* App Key Health Card */}
          <HealthCard
            title={health.report.appKey.displayName}
            healthy={health.report.appKey.health.healthy}
            icon={<Settings className="h-5 w-5 text-primary" />}
          />

          {/* Lucid Health Card */}
          <HealthCard
            title={health.report.lucid.displayName}
            healthy={health.report.lucid.health.healthy}
            message={health.report.lucid.health.message}
            meta2={health.report.lucid.meta}
            icon={<Database className="h-5 w-5 text-primary" />}
          />

          {/* Redis Health Card */}
          <HealthCard
            title={health.report.redis.displayName}
            healthy={health.report.redis.health.healthy}
            message={health.report.redis.health.message}
            meta={health.report.redis.meta}
            icon={<Database className="h-5 w-5 text-primary" />}
          />
        </div>
      </div>
    );

  }


  interface HealthCardProps {
    title: string
    healthy: boolean
    message?: string
    meta?: Array<{
      connection: string
      status: string
      used_memory: string
      error: string | null
    }>
    meta2?: Array<{
    connection: string
    message: string
    error?: string | null
  }>
    icon: React.ReactNode
  }

function HealthCard({ title, healthy, message, meta, meta2, icon }: HealthCardProps) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className={`rounded-full p-1 ${healthy ? "bg-green-100" : "bg-red-100"}`}>{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            {healthy ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <CheckCircle className="h-5 w-5 text-red-500" />
            )}
            <CardDescription>
              Status:{" "}
              <span className={healthy ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                {healthy ? "Healthy" : "Unhealthy"}
              </span>
            </CardDescription>
          </div>

          {message && <div className="mt-2 text-sm text-muted-foreground">{message}</div>}

          {meta && meta.length > 0 && (
            <div className="mt-4 space-y-2">
              {meta.map((item, index) => (
                <div key={index} className="rounded-md bg-muted p-2 text-xs">
                  <div className="flex justify-between">
                    <span className="font-medium">Connection:</span>
                    <span>{item.connection}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span className={item.status === "ready" ? "text-green-500" : "text-amber-500"}>{item.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Memory:</span>
                    <span>{item.used_memory}</span>
                  </div>
                  {item.error && (
                    <div className="flex justify-between">
                      <span className="font-medium">Error:</span>
                      <span className="text-red-500">{item.error}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}


{meta2 && meta2.length > 0 && (
            <div className="mt-4 space-y-2">
              {meta2.map((item, index) => (
                <div key={index} className="rounded-md bg-muted p-2 text-xs">
                  <div className="flex justify-between">
                    <span className="font-medium">Connection:</span>
                    <span>{item.connection}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Message:</span>
                    <span>{item.message}</span>
                  </div>
                  {item.error && (
                    <div className="flex justify-between">
                      <span className="font-medium">Error:</span>
                      <span className="text-red-500">{item.error}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
