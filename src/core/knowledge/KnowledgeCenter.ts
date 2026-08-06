export interface KnowledgeDocument {
  id: string;
  empresaNit: string;
  title: string;
  type: 'WEB_SCRAPE' | 'PDF_REPORT' | 'WHATSAPP_CHAT' | 'CUSTOMER_REVIEW' | 'INTERNAL_NOTE' | 'EMAIL';
  sourceUrl?: string;
  content: string;
  vectorChunksCount: number;
  embeddingModel: string;
  indexedAt: string;
  status: 'INDEXED' | 'INDEXING' | 'ERROR';
}

export interface SearchResult {
  chunkId: string;
  documentTitle: string;
  similarityScore: number; // 0.0 - 1.0
  textSnippet: string;
  sourceType: string;
}

class KnowledgeCenter {
  private documents: KnowledgeDocument[] = [
    {
      id: 'doc_101',
      empresaNit: '900123456-1',
      title: 'Sitio Web Principal & Catálogo B2B (Scraped via Apify)',
      type: 'WEB_SCRAPE',
      sourceUrl: 'https://alpina.com.co',
      content: 'Alpina es una multinacional colombiana líder en productos alimenticios, lácteos, bebidas y nutrición vegetal...',
      vectorChunksCount: 42,
      embeddingModel: 'text-embedding-004 (Google)',
      indexedAt: 'Hace 2 horas',
      status: 'INDEXED',
    },
    {
      id: 'doc_102',
      empresaNit: '900123456-1',
      title: 'Reseñas Públicas Google Maps (4.6 estrellas - 1,240 comentarios)',
      type: 'CUSTOMER_REVIEW',
      content: 'Excelente atención al cliente en planta. Productos frescos pero algunos clientes reportan demoras en distribución minorista...',
      vectorChunksCount: 18,
      embeddingModel: 'text-embedding-004 (Google)',
      indexedAt: 'Hace 1 hora',
      status: 'INDEXED',
    },
    {
      id: 'doc_103',
      empresaNit: '900123456-1',
      title: 'Transcripción Negociación WhatsApp con Gerencia de Compras',
      type: 'WHATSAPP_CHAT',
      content: 'El gerente de TI confirmó interés en optimizar la infraestructura de comercio electrónico B2B para Q3...',
      vectorChunksCount: 9,
      embeddingModel: 'text-embedding-004 (Google)',
      indexedAt: 'Hace 30 min',
      status: 'INDEXED',
    },
  ];

  public getDocumentsByEmpresa(nit: string): KnowledgeDocument[] {
    return this.documents.filter((doc) => doc.empresaNit === nit);
  }

  public addDocument(doc: Omit<KnowledgeDocument, 'id' | 'indexedAt' | 'status' | 'vectorChunksCount' | 'embeddingModel'>): KnowledgeDocument {
    const newDoc: KnowledgeDocument = {
      ...doc,
      id: `doc_${Date.now()}`,
      vectorChunksCount: Math.floor(doc.content.length / 150) + 1,
      embeddingModel: 'text-embedding-004 (Google)',
      indexedAt: 'Justo ahora',
      status: 'INDEXED',
    };
    this.documents.unshift(newDoc);
    return newDoc;
  }

  public queryVectorDB(empresaNit: string, query: string): SearchResult[] {
    const docs = this.getDocumentsByEmpresa(empresaNit);
    if (docs.length === 0) return [];

    return docs.map((doc, idx) => ({
      chunkId: `chunk_${doc.id}_${idx}`,
      documentTitle: doc.title,
      similarityScore: parseFloat((0.89 + (0.08 / (idx + 1))).toFixed(3)),
      textSnippet: doc.content.substring(0, 180) + '...',
      sourceType: doc.type,
    }));
  }
}

export const knowledgeCenter = new KnowledgeCenter();
