// Dynamically load all PDF files in /src/pdfContent/ subfolders
const pdfModules = import.meta.glob('/src/pdfContent/**/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default'
});

// Known metadata descriptions and topics for topics in High Level System Design
const documentMetaLookup = {
  '01-System Design - Monolith and Microservices.pdf': {
    number: 1,
    subtitle: 'Monolith vs Microservices Architecture',
    description: 'Monolith vs Microservices architecture, trade-offs, service decomposition and communication patterns.',
    fileSize: '3.9 MB',
    pages: '38 pages',
    tags: ['Monolith', 'Microservices', 'Scalability', 'Decomposition', 'Distributed Systems'],
    topics: [
      'Monolithic Architecture Pros & Cons',
      'Microservices Architecture & Trade-offs',
      'Inter-service Communication (Sync vs Async)',
      'Database per Service & Data Consistency',
      'Decomposition Patterns & Migration Strategies'
    ]
  },
  '02-System Design - API Gateway and Load Balancers.pdf': {
    number: 2,
    subtitle: 'Load Balancers & API Gateways',
    description: 'Layer 4 vs Layer 7 load balancing algorithms, API Gateway routing, rate limiting and high availability.',
    fileSize: '3.9 MB',
    pages: '42 pages',
    tags: ['Load Balancer', 'API Gateway', 'L4/L7', 'Reverse Proxy', 'Rate Limiting'],
    topics: [
      'Layer 4 vs Layer 7 Load Balancing',
      'Load Balancing Algorithms (Round Robin, Least Connections, etc.)',
      'API Gateway Responsibilities & Pattern',
      'Rate Limiting, Throttling & Circuit Breaking',
      'High Availability, Health Checks & Failover'
    ]
  },
  '03-System Design - Proxy and Networking Protocols.pdf': {
    number: 3,
    subtitle: 'Forward/Reverse Proxies & Network Protocols',
    description: 'Forward vs Reverse Proxy architectures, TCP/UDP handshakes, HTTP/HTTPS, WebSockets, and WebRTC protocols.',
    fileSize: '3.9 MB',
    pages: '35 pages',
    tags: ['Forward Proxy', 'Reverse Proxy', 'TCP/UDP', 'WebSocket', 'WebRTC', 'Networking Protocols'],
    topics: [
      'Forward Proxy vs Reverse Proxy Architecture',
      'Proxy vs VPN vs Load Balancer Comparison',
      'TCP 3-Way Handshake, Reliability & Order',
      'UDP vs TCP Trade-offs for Real-Time Apps',
      'Application Layer Protocols: HTTP/HTTPS, WebSockets & WebRTC'
    ]
  }
};

const categoryDescriptions = {
  'High Level System Design': 'Complete notes on System Design, distributed systems, monoliths, microservices, load balancing, proxies, and networking protocols.',
  'System Design': 'Comprehensive architectural deep dives, distributed systems, and scalability patterns.'
};

export function getPdfCategories() {
  const categoriesMap = {};

  Object.entries(pdfModules).forEach(([path, url]) => {
    // Path format: /src/pdfContent/<FolderName>/<FileName>.pdf
    const relativePath = path.replace('/src/pdfContent/', '');
    const parts = relativePath.split('/');

    if (parts.length >= 2) {
      const folderName = parts[0];
      const filename = parts.slice(1).join('/');
      const docId = filename.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      if (!categoriesMap[folderName]) {
        categoriesMap[folderName] = {
          id: folderName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          title: folderName,
          description:
            categoryDescriptions[folderName] ||
            `Comprehensive structured notes on ${folderName} for your learning journey.`,
          documents: []
        };
      }

      const meta = documentMetaLookup[filename] || {};
      const numMatch = filename.match(/^(\d+)/);
      const parsedNumber = numMatch ? parseInt(numMatch[1], 10) : undefined;
      const cleanTitle = filename.replace(/\.pdf$/i, '').replace(/^\d+[\s-_]*/, '');

      categoriesMap[folderName].documents.push({
        id: docId,
        filename: filename,
        title: filename, // Exact same as in the folder as requested
        cleanTitle: cleanTitle,
        number: meta.number || parsedNumber || (categoriesMap[folderName].documents.length + 1),
        subtitle: meta.subtitle || cleanTitle,
        url: url,
        directUrl: `/pdfContent/${encodeURIComponent(folderName)}/${encodeURIComponent(filename)}`,
        fileSize: meta.fileSize || '3.9 MB',
        pages: meta.pages || '35 pages',
        description:
          meta.description ||
          `Detailed learning note and architectural visual guide for ${filename}.`,
        tags: meta.tags || ['System Design', 'Architecture', 'Networking'],
        topics: meta.topics || [cleanTitle]
      });
    }
  });

  // Sort documents by filename
  Object.values(categoriesMap).forEach((cat) => {
    cat.documents.sort((a, b) => a.filename.localeCompare(b.filename));
  });

  return Object.values(categoriesMap);
}

export const pdfCategories = getPdfCategories();
