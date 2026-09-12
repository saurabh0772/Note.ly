// Dynamically load all PDF files in /src/pdfContent/ subfolders
const pdfModules = import.meta.glob('/src/pdfContent/**/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default'
});

// Known metadata descriptions and topics for topics in High Level System Design
const documentMetaLookup = {
  '01-System Design - Monolith and Microservices.pdf': {
    description: 'Monolith vs Microservices architecture, trade-offs, service decomposition and communication patterns.',
    fileSize: '4.0 MB',
    pages: '38 pages'
  },
  '02-System Design - API Gateway and Load Balancers.pdf': {
    description: 'Layer 4 vs Layer 7 load balancing algorithms, API Gateway routing, rate limiting and high availability.',
    fileSize: '4.0 MB',
    pages: '42 pages'
  }
};

const categoryDescriptions = {
  'High Level System Design': 'Complete notes on System Design, distributed systems, monoliths, microservices, load balancing and API gateways.',
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

      categoriesMap[folderName].documents.push({
        id: docId,
        filename: filename,
        title: filename, // Exact same as in the folder as requested
        url: url,
        directUrl: `/pdfContent/${encodeURIComponent(folderName)}/${encodeURIComponent(filename)}`,
        fileSize: meta.fileSize || '3.9 MB',
        pages: meta.pages || '40 pages',
        description:
          meta.description ||
          `Detailed learning note and architectural visual guide for ${filename}.`
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
