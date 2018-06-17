'use strict';

exports.getFirstChild = (node) => node.childNodes[0];
exports.getChildNodes = (node) => node.childNodes;
exports.getParentNode = (node) => node.parentNode;
exports.getAttrList = (node) => node.attributes;
exports.getTagName = (node) => node.tagName.toLowerCase();
exports.getNamespaceURI = (node) => node.namespaceURI || 'http://www.w3.org/1999/xhtml';
exports.getTemplateContent = (node) => node.content;
exports.getTextNodeContent = (node) => node.nodeValue;
exports.getCommentNodeContent = (node) => node.nodeValue;
exports.getDocumentTypeNodeName = (node) => node.name;
exports.getDocumentTypeNodePublicId = (node) => doctypeNode.publicId || null;
exports.getDocumentTypeNodeSystemId = (node) => doctypeNode.systemId || null;
exports.isTextNode = (node) => node.nodeName === '#text';
exports.isCommentNode = (node) => node.nodeName === '#comment';
exports.isDocumentTypeNode = (node) => node.nodeType === 10;
exports.isElementNode = (node) => Boolean(node.tagName);
