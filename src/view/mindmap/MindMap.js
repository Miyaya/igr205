import React, { useState, useRef, useCallback,useEffect } from 'react';
import ReactFlow, {
    Background,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  Controls,
  useStore,
} from 'reactflow';
import 'reactflow/dist/style.css';
import content from "../../res/content.json"

import Markdown from 'react-markdown'

import './index.css';

//read conten json file  and set initial nodes
const outline = content.topics;

const initialNodes = outline.map((topic) => {
    return {
        id: topic.id.toString(),
        data: { label: topic.title ,text:topic.text,note:topic.note},
        position: { x: topic.x, y: topic.y },
        type: 'default',
    };
});

const initialEdges = outline.map((topic) => {
        return {
            id: 'e'+ topic.previousSlide.toString() + topic.id.toString(),
            source: topic.previousSlide.toString(),
            target: topic.id.toString(),
        };
    
    
});

const transformSelector = (state) => state.transform;

let id = initialNodes.length ;
const getId = () => `dndnode_${id++}`;
var nodeid;


const DnDFlow = () => {
    

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  let [nodeName, setNodeName] = useState("Topic1\nTopic2\nTopic3\nTopic4");
  
const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    };


  const onNodeClick = (event, node) => {
        nodeName = node.data.label+"\n";
        setNodeName(nodeName);
        nodeid = node.id;
};

const onPaneClick = (event) => {
        nodeName = "\>Topic1\n<Topic2\n<Topic3\n<Topic4";
        setNodeName(nodeName);
        nodeid = null;
};

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeid) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }

        return node;
      })
    );
  }, [nodeName, setNodes]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);


  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `Topic ${id} ` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
          > 
             <Panel position="top-left" onDragStart={(event) => onDragStart(event, 'default')} draggable>Topic</Panel>
 
            
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <aside>
            <textarea style={{ height: 550 }} value={nodeName} onChange={(evt) => setNodeName(evt.target.value)}/>
        </aside>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
