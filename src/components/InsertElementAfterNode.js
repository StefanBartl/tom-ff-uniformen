/* ==========================
!    Insert Element after Reference Node
=========================== */
export default function InsertElementAfterNode(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};