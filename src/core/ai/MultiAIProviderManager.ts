export type AIProvider = 'gemini' | 'openai' | 'claude' | 'deepseek' | 'mistral' | 'qwen';

export interface AIModelConfig {
  id: string;
  provider: AIProvider;
  name: string;
  version: string;
  maxTokens: number;
  costPer1kTokens: number;
  isAvailable: boolean;
  recommendedFor: ('audit' | 'copywriting' | 'chat' | 'code' | 'pdf_summary')[];
}

export interface AIRequestPayload {
  task: 'audit' | 'copywriting' | 'chat' | 'pdf_summary';
  prompt: string;
  preferredProvider?: AIProvider;
  temperature?: number;
  maxTokens?: number;
  context?: Record<string, any>;
}

export interface AIResponsePayload {
  text: string;
  providerUsed: AIProvider;
  modelUsed: string;
  tokensConsumed: number;
  executionTimeMs: number;
  costUsd: number;
}

class MultiAIProviderManager {
  private availableModels: AIModelConfig[] = [
    {
      id: 'gemini-1.5-pro',
      provider: 'gemini',
      name: 'Google Gemini 1.5 Pro',
      version: '1.5-Pro-002',
      maxTokens: 2000000,
      costPer1kTokens: 0.00125,
      isAvailable: true,
      recommendedFor: ['audit', 'pdf_summary'],
    },
    {
      id: 'gpt-4o',
      provider: 'openai',
      name: 'OpenAI GPT-4o',
      version: 'gpt-4o-2024-08-06',
      maxTokens: 128000,
      costPer1kTokens: 0.0025,
      isAvailable: true,
      recommendedFor: ['copywriting', 'chat'],
    },
    {
      id: 'claude-3-5-sonnet',
      provider: 'claude',
      name: 'Anthropic Claude 3.5 Sonnet',
      version: 'claude-3-5-sonnet-20241022',
      maxTokens: 200000,
      costPer1kTokens: 0.003,
      isAvailable: true,
      recommendedFor: ['audit', 'copywriting'],
    },
    {
      id: 'deepseek-v3',
      provider: 'deepseek',
      name: 'DeepSeek V3 / R1',
      version: 'deepseek-chat-v3',
      maxTokens: 64000,
      costPer1kTokens: 0.0002,
      isAvailable: true,
      recommendedFor: ['code', 'chat'],
    },
    {
      id: 'mistral-large',
      provider: 'mistral',
      name: 'Mistral Large 2',
      version: 'mistral-large-2407',
      maxTokens: 128000,
      costPer1kTokens: 0.002,
      isAvailable: true,
      recommendedFor: ['chat'],
    },
    {
      id: 'qwen-2.5-72b',
      provider: 'qwen',
      name: 'Alibaba Qwen 2.5 72B',
      version: 'qwen-2.5-72b-instruct',
      maxTokens: 32000,
      costPer1kTokens: 0.0004,
      isAvailable: true,
      recommendedFor: ['chat'],
    },
  ];

  public getModels(): AIModelConfig[] {
    return [...this.availableModels];
  }

  public async executeTask(payload: AIRequestPayload): Promise<AIResponsePayload> {
    const provider = payload.preferredProvider || 'gemini';
    const model = this.availableModels.find((m) => m.provider === provider && m.isAvailable) || this.availableModels[0];

    const startTime = performance.now();

    // Simulated execution interface fallback across multi-providers
    return new Promise((resolve) => {
      setTimeout(() => {
        const endTime = performance.now();
        resolve({
          text: `[Respuesta del Motor ${model.name}]: Tarea "${payload.task}" procesada exitosamente para ASYS Intelligence Platform.`,
          providerUsed: model.provider,
          modelUsed: model.id,
          tokensConsumed: 480,
          executionTimeMs: Math.round(endTime - startTime + 250),
          costUsd: (480 / 1000) * model.costPer1kTokens,
        });
      }, 400);
    });
  }
}

export const multiAIManager = new MultiAIProviderManager();
