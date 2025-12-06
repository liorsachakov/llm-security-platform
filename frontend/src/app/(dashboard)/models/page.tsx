'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link as LinkIcon, FileCode, Shield, AlertTriangle, Activity } from 'lucide-react';

export default function ModelUploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const myModels = [
    {
      id: 1,
      name: 'GPT-Defense-v1',
      description: 'Enhanced security model with prompt injection protection',
      visibility: 'Public',
      status: 'Active',
      uploaded: '2025-10-10',
      vulnerabilities: {
        critical: 0,
        high: 2,
        medium: 5,
        low: 12,
      },
      metrics: {
        accuracy: 94.2,
        responseTime: 1.2,
        testsRun: 156,
        successRate: 87.3,
      },
    },
    {
      id: 2,
      name: 'SecureLLM-Beta',
      description: 'Experimental model with advanced content filtering',
      visibility: 'Private',
      status: 'Testing',
      uploaded: '2025-10-15',
      vulnerabilities: {
        critical: 1,
        high: 0,
        medium: 3,
        low: 8,
      },
      metrics: {
        accuracy: 91.8,
        responseTime: 0.9,
        testsRun: 45,
        successRate: 82.1,
      },
    },
  ];

  const handleUpload = () => {
    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 500);
      }
    }, 200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-white mb-2">Model Management</h1>
        <p className="text-slate-400">
          Upload and monitor your LLMs under adversarial testing
        </p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="bg-slate-900 border border-slate-800">
          <TabsTrigger value="upload" className="data-[state=active]:bg-slate-800">
            Upload Model
          </TabsTrigger>
          <TabsTrigger value="mymodels" className="data-[state=active]:bg-slate-800">
            My Models ({myModels.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-slate-900/50 border-slate-800">
              <h2 className="text-xl text-white mb-6 flex items-center gap-2">
                <Upload className="w-5 h-5 text-cyan-500" />
                Upload Model File
              </h2>

              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="modelName" className="text-slate-300">
                    Model Name
                  </Label>
                  <Input
                    id="modelName"
                    placeholder="e.g., GPT-Defense-v2"
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your model's capabilities and security features..."
                    className="bg-slate-950 border-slate-800 text-white min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Model File</Label>
                  <div className="border-2 border-dashed border-slate-800 rounded-lg p-8 text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
                    <FileCode className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-sm text-slate-400 mb-2">
                      Drop your model file here or click to browse
                    </p>
                    <p className="text-xs text-slate-500">
                      Supported formats: .pt, .onnx, .safetensors (Max 5GB)
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-lg">
                  <div>
                    <Label htmlFor="visibility" className="text-white">
                      Public Visibility
                    </Label>
                    <p className="text-xs text-slate-500">
                      Allow others to test your model
                    </p>
                  </div>
                  <Switch id="visibility" />
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Uploading...</span>
                      <span className="text-cyan-500">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="bg-slate-800" />
                  </div>
                )}

                <Button
                  type="button"
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Model'}
                </Button>
              </form>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-800">
              <h2 className="text-xl text-white mb-6 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-cyan-500" />
                Connect via API
              </h2>

              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="apiName" className="text-slate-300">
                    Model Name
                  </Label>
                  <Input
                    id="apiName"
                    placeholder="e.g., My-API-Model"
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endpoint" className="text-slate-300">
                    API Endpoint
                  </Label>
                  <Input
                    id="endpoint"
                    type="url"
                    placeholder="https://api.example.com/v1/chat"
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey" className="text-slate-300">
                    API Key (Optional)
                  </Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="sk-..."
                    className="bg-slate-950 border-slate-800 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiDescription" className="text-slate-300">
                    Description
                  </Label>
                  <Textarea
                    id="apiDescription"
                    placeholder="Describe your API model..."
                    className="bg-slate-950 border-slate-800 text-white min-h-[100px]"
                  />
                </div>

                <Button
                  type="button"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Connect API
                </Button>
              </form>

              <div className="mt-6 p-4 bg-slate-950 border border-slate-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-cyan-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm text-white mb-1">Security Note</h4>
                    <p className="text-xs text-slate-400">
                      Your API credentials are encrypted and never shared. We only
                      send test queries to evaluate model robustness.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mymodels" className="space-y-6">
          {myModels.map((model) => (
            <Card key={model.id} className="p-6 bg-slate-900/50 border-slate-800">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl text-white">{model.name}</h2>
                    <Badge
                      variant="outline"
                      className={
                        model.status === 'Active'
                          ? 'border-emerald-500/50 text-emerald-500'
                          : 'border-amber-500/50 text-amber-500'
                      }
                    >
                      {model.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-slate-700 text-slate-400"
                    >
                      {model.visibility}
                    </Badge>
                  </div>
                  <p className="text-slate-400">{model.description}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Uploaded on {model.uploaded}
                  </p>
                </div>
                <Button variant="outline" className="border-slate-700 text-slate-300">
                  Settings
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Vulnerabilities Detected
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-950 border border-red-500/20 rounded-lg">
                      <div className="text-2xl text-red-500 mb-1">
                        {model.vulnerabilities.critical}
                      </div>
                      <div className="text-xs text-slate-400">Critical</div>
                    </div>
                    <div className="p-4 bg-slate-950 border border-orange-500/20 rounded-lg">
                      <div className="text-2xl text-orange-500 mb-1">
                        {model.vulnerabilities.high}
                      </div>
                      <div className="text-xs text-slate-400">High</div>
                    </div>
                    <div className="p-4 bg-slate-950 border border-amber-500/20 rounded-lg">
                      <div className="text-2xl text-amber-500 mb-1">
                        {model.vulnerabilities.medium}
                      </div>
                      <div className="text-xs text-slate-400">Medium</div>
                    </div>
                    <div className="p-4 bg-slate-950 border border-slate-700 rounded-lg">
                      <div className="text-2xl text-slate-400 mb-1">
                        {model.vulnerabilities.low}
                      </div>
                      <div className="text-xs text-slate-400">Low</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-cyan-500" />
                    Performance Metrics
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Model Accuracy</span>
                        <span className="text-white">{model.metrics.accuracy}%</span>
                      </div>
                      <Progress value={model.metrics.accuracy} className="bg-slate-800" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Success Rate</span>
                        <span className="text-white">{model.metrics.successRate}%</span>
                      </div>
                      <Progress value={model.metrics.successRate} className="bg-slate-800" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-400">Avg. Response Time</span>
                        <p className="text-white mt-1">{model.metrics.responseTime}s</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Tests Run</span>
                        <p className="text-white mt-1">{model.metrics.testsRun}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 flex justify-between">
                <Button variant="outline" className="border-slate-700 text-slate-300">
                  View Full Report
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-slate-700 text-slate-300">
                    Pause Testing
                  </Button>
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    Run New Tests
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}




