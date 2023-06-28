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

var outlinemd = [];
var text = "";
var nodetext = "";
//put each node label in the outlnie markdown text
initialNodes.forEach((node) => {
    outlinemd.push("# "+node.data.label+"\n");
    outlinemd.push("## "+node.data.text+"\n");
    outlinemd.push(node.data.note+"\n");
    outlinemd.push("\n");
});
outlinemd.forEach((node) => {
    text += node;
});

nodetext = text;

let id = initialNodes.length ;
const getId = () => `dndnode_${id++}`;
var nodeid;


const DnDFlow = () => {
    

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  
  let [nodeName, setNodeName] = useState("outline");
  let [nodetext, setPostContent] = useState(text);

const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    };


  const onNodeClick = (event, node) => {
        nodeName = node.data.label;
        nodetext = "## "+node.data.text+"\n"+node.data.note+"\n";
        setNodeName(nodeName);
        setPostContent(nodetext);
        nodeid = node.id;
};

const onPaneClick = (event) => {
        nodeName = "outline";
        nodetext = text;
        setNodeName(nodeName);
        setPostContent(nodetext);
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

  useEffect(() => {
    setPostContent(nodetext);
  }, [nodetext, setPostContent]);

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
  
  const savenodes = () => {
    const data = {
        topics: nodes.map((node) => {
            return {
                id: node.id,
                title: node.data.label,
                text: node.data.text,
                note: node.data.note,
                x: node.position.x,
                y: node.position.y,
                previousSlide: node.data.previousSlide,
            };
        }),
    };
    //
    
};

    
   


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
            <input style={{ width:250 }} value={nodeName} onChange={(evt) => setNodeName(evt.target.value)}/>
            <textarea style={{ height: 500, width:250 }}  value={nodetext} onChange={e => setPostContent(e.target.value)}    />
            <button onClick={savenodes}>Save</button>
        </aside>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
