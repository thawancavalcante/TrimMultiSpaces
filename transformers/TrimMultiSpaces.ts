import * as ts from 'typescript';

function createRemoveMultiSpacesTransformer(): ts.TransformerFactory<ts.SourceFile> {
	return (context: ts.TransformationContext) => {
		return (sourceFile: ts.SourceFile) => {
			function visit(node: ts.Node): ts.Node {
				if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
					if (node.expression.text === 'TrimMultispaces') {
						const [arg] = node.arguments;

						if (ts.isTemplateExpression(arg)) {
							const newHeadText = arg.head.text.replace(/  +/g, '');
							const newHead = ts.factory.createTemplateHead(newHeadText);

							const newSpans = arg.templateSpans.map((span) => {
								const newText = span.literal.text.replace(/  +/g, '');
								const newLiteral = span.literal.kind === ts.SyntaxKind.TemplateTail ? ts.factory.createTemplateTail(newText) : ts.factory.createTemplateMiddle(newText);

								return ts.factory.createTemplateSpan(span.expression, newLiteral);
							});

							const newTemplate = ts.factory.createTemplateExpression(newHead, newSpans);

							return newTemplate;
						}
					}
				}

				return ts.visitEachChild(node, visit, context);
			}

			return ts.visitNode(sourceFile, visit);
		};
	};
}

export default createRemoveMultiSpacesTransformer;
