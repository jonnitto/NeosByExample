<?php

namespace Base\Theme;

use Neos\ContentRepository\Domain\Model\Node;
use Neos\Flow\Core\Bootstrap;
use Neos\Flow\Package\Package as BasePackage;
use Neos\Neos\Routing\Cache\RouteCacheFlusher;
use Neos\Neos\Utility\NodeUriPathSegmentGenerator;

/**
 * The Node Templates Magic Package
 */
class Package extends BasePackage
{
    /**
     * @param Bootstrap $bootstrap The current bootstrap
     * @return void
     */
    public function boot(Bootstrap $bootstrap)
    {
        $dispatcher = $bootstrap->getSignalSlotDispatcher();

        // Sync uri with title
        // - Base.Theme:Mixin.SynUriPathSegmentWithTitle
        $newUriPathSegment = null;
        $dispatcher->connect(
            Node::class,
            'nodePropertyChanged',
            function (Node $node, $propertyName, $oldValue, $newValue) use ($bootstrap, &$newUriPathSegment) {
                if ($propertyName === 'title' && ($node->getNodeType()->isOfType('Base.Theme:Mixin.SynUriPathSegmentWithTitle'))) {
                    $nodeUriPathSegmentGenerator = $bootstrap->getObjectManager()->get(
                        NodeUriPathSegmentGenerator::class
                    );
                    $newUriPathSegment = strtolower($nodeUriPathSegmentGenerator->generateUriPathSegment($node));
                    $node->setProperty('uriPathSegment', $newUriPathSegment);
                    $bootstrap->getObjectManager()->get(RouteCacheFlusher::class)->registerNodeChange($node);
                } elseif ($propertyName === 'uriPathSegment' && $newUriPathSegment !== null && $newValue !== $newUriPathSegment) {
                    $node->setProperty('uriPathSegment', $newUriPathSegment);
                    $newUriPathSegment = null;
                }
            }
        );
    }
}
