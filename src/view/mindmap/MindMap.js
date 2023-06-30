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
import { List, arrayMove } from 'react-movable';


import './index.css';
import {getTopics, updateTopic, addTopic} from "../../api"


const DnDFlow = () => {
    

  var outlinemd = [];
  var text = "";
  // const outline = props.outline;
  let [nodeName, setNodeName] = useState("outline");
  let [nodeid, setNodeid] = useState(0);
  let [nodetext, setNodeContent] = useState(text);
  let [outline, setOutline] = useState([]);
  let [initialNodes, setInitialNodes] = useState([]);
  let [initialEdges, setInitialEdges] = useState([]);
  let [orderedNodes, setOrderedNodes] = useState([]);
  const reactFlowWrapper = useRef(null);
  let [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  let [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  let [reactFlowInstance, setReactFlowInstance] = useState(null);


  function getOutline(initialNodes){
    initialNodes.forEach((node) => {
      outlinemd.push("# "+node.data.label+"\n");
      outlinemd.push("## "+node.data.text+"\n");
      outlinemd.push(node.data.note+"\n");
      outlinemd.push("\n");
    });
    outlinemd.forEach((node) => {
      text += node;
    });
    return text;
  }

  useEffect(() => {
    getTopics(setOutline);
  }, []);
  
  useEffect(() => {
    outline.sort((a,b) => a.index - b.index);
    setInitialNodes(outline.map((topic) => {
      return {
          id: topic.id.toString(),
          data: { label: topic.title ,text:topic.text,note:topic.note},
          position: { x: topic.x, y: topic.y },
          type: 'default',
          previousSlide: topic.previousSlide,
          index: topic.index
      };
    }));
    setNodes(initialNodes.map((node) => {
      if (node.id === nodeid) {
        // it's important that you create a new object here
        // in order to notify react flow about the change
        node.data = {
          ...node.data,
          label: nodeName,
          
        };
      }
      return node;
    }));
  

    text = getOutline(initialNodes)
    setNodeContent(text)

  
  }, [outline]);
  
  
  useEffect(() => {

    let initEdges = []
    outline.forEach((topic) => {
      topic.previousSlide.forEach((prev)=>{
        initEdges.push({
          id: 'e'+ prev.toString() + topic.id.toString(),
          source: prev.toString(),
          target: topic.id.toString(),
        }) ;
      })
    })
  
    setInitialEdges(initEdges);  
    setEdges(initialEdges.map((eds) => addEdge([], eds)))
  }, [outline]);


const getId = () => `${initialNodes.length++}`;
// var nodeid;


const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    };


  const onNodeClick = (event, node) => {
        setNodeName(node.data.label)
        if(node.data.text == undefined){
            node.data.text = "Type your text here";
        }
        if(node.data.note == undefined){
            node.data.note = "Type your note here";
        }
        nodetext = "## "+node.data.text.replace(/[\n]/g, "")+"\n"+node.data.note;
        // setNodeName(nodeName);
        setNodeContent(nodetext);
        setNodeid(node.id)
};

const onPaneClick = (event) => {
        setNodeName("outline")
        setNodeContent(getOutline(initialNodes))
        // setNodeName(nodeName);
        setNodeid(null)
};
//itms contain nodes id and  labels
 var itms = [];
 nodes && nodes.map((node) => {
    itms.push(node.data.label);
    itms.push(node.id);
});

//use only labels in the list
const [items, setItems] = React.useState(itms.filter((item, index) => index % 2 === 0));
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
          // change the label of the node in the itms
          var index = itms.indexOf(node.id);
          itms[index-1] = nodeName;
          setItems(itms.filter((item, index) => index % 2 === 0));
          

        }

        return node;
      

      })
    );
    
    text = "";
    outlinemd = [];
    nodes.forEach((node) => {
      outlinemd.push("# "+node.data.label+"\n");
      outlinemd.push("## "+node.data.text+"\n");
      outlinemd.push(node.data.note+"\n");
      outlinemd.push("\n");
    }
    );
    outlinemd.forEach((node) => {
      text += node;
    }
    );
  }, [nodeName, setNodes]);


  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeid) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            //get the text after the second # in the markdown text, and before the first \n,then remove ## from the text
            text: nodetext.substring(nodetext.indexOf("#")+3,nodetext.indexOf("\n")).replace(/[\n]/g, ""),
            //get the text after the first \n in the markdown text
            note: nodetext.substring(nodetext.indexOf("\n")+1),
          };
        }
        return node;
      })
    );
    
    text = "";
    outlinemd = [];
    nodes.forEach((node) => {
      outlinemd.push("# "+node.data.label+"\n");
      outlinemd.push("## "+node.data.text+"\n");
      outlinemd.push(node.data.note+"\n");
      outlinemd.push("\n");
    }
    );
    outlinemd.forEach((node) => {
      text += node;
    }
    );
  }, [nodetext, setNodes]);


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
      let id = getId()
      const newNode = {
        id: `dndnode_${id}`,
        type,
        position,
        data: { label: `Topic ${id} ` },
        index: id,
        previousSlide: []
      };

      setNodes((nds) => nds.concat(newNode));
      setItems((itms) => itms.concat(newNode.data.label));
    },
    [reactFlowInstance]
  );
  
  const savenodes = () => {
    let index = 0
    const data = nodes.map((node) => {
      let previousSlides = []
        edges.forEach(edge => {
          if(Number(edge.target) == Number(node.id)){
            previousSlides.push(edge.source)
          }
         });
        return {
            "id": Number(node.id),
            "title": node.data.label ? node.data.label : "",
            "text": node.data.text ? node.data.text : "",
            "note": node.data.note ? node.data.note : "",
            "x": node.position.x,
            "y": node.position.y,
            "previousSlide": previousSlides,
            "images": [],
            "index": index++
        };
    });

   
   

    data.forEach(topic=>{
      let isNew = true;
      outline.forEach(original_topic=>{
        if (topic.id == original_topic.id) isNew = false
      })
      if(isNew){
        addTopic(topic, (result)=>{/*console.log("POST RESULT : ",result)*/})
      }else{
        updateTopic(topic.id, topic, (result)=>{/*console.log("PUT RESULT : ",result)*/})
      }
    })

    getTopics(setOutline);

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
        <List
      // values={items}

      values={nodes.map((node)=>node.data.label)}
      onChange={({ oldIndex, newIndex }) =>
        {
          // setItems(arrayMove(nodes, oldIndex, newIndex))
          nodes[oldIndex].index = newIndex
          nodes[newIndex].index = oldIndex
          setNodes(arrayMove(nodes, oldIndex, newIndex))
          
        }
      }
      renderList={({ children, props }) => <ul {...props}>{children}</ul>}
      renderItem={({ value, props }) => <li {...props}>{value}</li>}
    />
        <aside>
        
            <input style={{ width:250 }} value={nodeName} onChange={(evt) => setNodeName(evt.target.value)}/>
            <textarea style={{ height: 500, width:250 }}  value={nodetext} onChange={(evt) => setNodeContent(evt.target.value)}   />
            <button onClick={savenodes}>Save</button>
        </aside>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
