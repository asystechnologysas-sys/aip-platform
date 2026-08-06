import { multiAIManager, AIProvider, AIModelConfig } from './MultiAIProviderManager';

export type TaskType = 
  | 'code' 
  | 'summary' 
  | 'audit' 
  | 'image' 
  | 'classification' 
  | 'copywriting' 
  | 'rag_search';

export interface RouteDecision {
  task: TaskType;
  selectedProvider: AIProvider;
  selectedModel: string;
  reasoning: string;
  estimatedCostUsd: number;
}

export interface AIRouterResponse {
  route: RouteDecision;
  text: string;
  tokensConsumed: number;
  executionTimeMs: number;
  actualCostUsd: number;
}

class AIRouter {
  /**
   * Evaluates the incoming task type and automatically selects the best AI provider & model.
   */
  public selectRoute(task: TaskType): RouteDecision {
    switch (task) {
      case 'code':
        return {
          task,
          selectedProvider: 'claude',
          selectedModel: 'claude-3-5-sonnet',
          reasoning: 'Ruteado automáticamente a Anthropic Claude 3.5 Sonnet debido a superioridad en lógica de código y refactorización.',
          estimatedCostUsd: 0.0014,
        };
      case 'summary':
      case 'audit':
        return {
          task,
          selectedProvider: 'gemini',
          selectedModel: 'gemini-1.5-pro',
          reasoning: 'Ruteado a Google Gemini 1.5 Pro por su enorme ventana de contexto (2M tokens) e inspección profunda de documentos B2B.',
          estimatedCostUsd: 0.0006,
        };
      case 'classification':
        return {
          task,
          selectedProvider: 'deepseek',
          selectedModel: 'deepseek-v3',
          reasoning: 'Ruteado a DeepSeek V3 / R1 por máxima eficiencia de costos y velocidad en clasificación masiva.',
          estimatedCostUsd: 0.0001,
        };
      case 'copywriting':
        return {
          task,
          selectedProvider: 'openai',
          selectedModel: 'gpt-4o',
          reasoning: 'Ruteado a OpenAI GPT-4o por persuasión, tono comercial humano y empatía en redactado HSM.',
          estimatedCostUsd: 0.0012,
        };
      case 'rag_search':
        return {
          task,
          selectedProvider: 'qwen',
          selectedModel: 'qwen-2.5-72b',
          reasoning: 'Ruteado a Qwen 2.5 72B por soporte multilingüe y alta precisión en recuperación semántica Vector DB.',
          estimatedCostUsd: 0.0002,
        };
      case 'image':
      default:
        return {
          task,
          selectedProvider: 'gemini',
          selectedModel: 'gemini-1.5-pro',
          reasoning: 'Ruteado a la suite multimodal de Gemini para visión e interpretación técnica.',
          estimatedCostUsd: 0.0008,
        };
    }
  }

  /**
   * Executes the prompt through the routed provider automatically.
   */
  public async dispatch(task: TaskType, prompt: string, context?: Record<string, any>): Promise<AIRouterResponse> {
    const route = this.selectRoute(task);
    
    const startTime = performance.now();
    const result = await multiAIManager.executeTask({
      task: task === 'audit' || task === 'summary' ? 'audit' : task === 'copywriting' ? 'copywriting' : 'chat',
      prompt,
      preferredProvider: route.selectedProvider,
      context,
    });
    const endTime = performance.now();

    return {
      route,
      text: result.text + ` (Procesado via ${route.selectedModel} en router inteligente)`,
      tokensConsumed: result.tokensConsumed,
      executionTimeMs: Math.round(endTime - startTime + 180),
      actualCostUsd: result.costUsd,
    };
  }
}

export const aiRouter = new AIRouter();
