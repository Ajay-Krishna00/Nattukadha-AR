import {
  Viro3DObject,
  ViroAmbientLight,
  ViroAnimations,
  ViroARImageMarker,
  ViroARScene,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
  ViroBox,
  ViroMaterials,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// const HelloWorldSceneAR = () => {
//   const [text, setText] = useState("Initializing AR...");

//   function onInitialized(state: any, reason: ViroTrackingReason) {
//     console.log("onInitialized", state, reason);
//     if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
//       setText("Ajay krishna d, anuj krishna");
//     } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
//       // Handle loss of tracking
//     }
//   }

//   return (
//     <ViroARScene onTrackingUpdated={onInitialized}>
//       <ViroText
//         text={text}
//         scale={[0.5, 0.5, 0.5]}
//         position={[0, 0, -2]}
//         style={styles.helloWorldTextStyle}
//       />
//     </ViroARScene>
//   );
// };

const InitialScene = (props) => {
  let data = props.sceneNavigator.viroAppProps;

  const [position, setPosition] = useState([0, 0, -0.5]);
  const [rotation, setRotation] = useState([0, 30, 0]);
  // const [avocadoScale, setAvocadoScale] = useState([0.2, 0.2, 0.2]);
  // const [rabbitScale, setRabbitScale] = useState([0.001, 0.001, 0.001]);

  const changePos = (newPosition) => {
    setPosition(newPosition);
  };

  const changeRot = (rotateState,rotationFactor,source) => {
    if (rotateState === 3) {
      let currRotation = [rotation[0], rotation[1] + rotationFactor, rotation[2]];
      setRotation(currRotation);
    }
  };

  // const changeScaleAvocado = (pinchState, scaleFactor, source) => {
  //   if (pinchState === 3) {
  //     let currScale = [avocadoScale[0] * scaleFactor, avocadoScale[1] * scaleFactor, avocadoScale[2] * scaleFactor];
  //     setAvocadoScale(currScale);
  //   }
  // };

  // const changeScaleRabbit = (pinchState, scaleFactor, source) => {
  //   if (pinchState === 3) {
  //     let currScale = [rabbitScale[0] * scaleFactor, rabbitScale[1] * scaleFactor, rabbitScale[2] * scaleFactor];
  //     setRabbitScale(currScale);
  //   }
  // };

  // const anchor = () => {
  //   console.log("image found!");
  // }

  // ViroARTrackingTargets.createTargets({
  //   image: {
  //     source: require("./assets/skull.jpg"),
  //     orientation: "Up",
  //     physicalWidth: 0.165, // real world width in meters
  //   }
  // })

  // ViroMaterials.createMaterials({
  //   wood: {
  //     diffuseTexture: require("./assets/side.png"),
  //   },
  // });
  // ViroAnimations.registerAnimations({
  //   rotate: {
  //     duration: 2000,
  //     properties: {
  //       rotateY: "+=90",
  //       rotateX: "+=90",
  //     },
  //   },
  // });
  return (
    <ViroARScene>
      {/* <ViroBox
        scale={[0.1, 0.1, 0.1]}
        position={[0, 0, -1]}

        onClick={() => {
          console.log("Box clicked!");
        }}
        onDrag={() => {
          console.log("Box dragged!");
        }}
        // onHover={() => {
        //   console.log("Box hovered!");
        // }}
        materials={["wood"]}
        // animation={{ name: "rotate", run: true, loop: true }}
      /> */}

      {/* <ViroARImageMarker target="image" onAnchorFound={anchor}> */}
      <ViroAmbientLight color="#ffffff" />

{(() => {
  if (data.object === "Kathakali") {
    return (
      <Viro3DObject
        source={require("./assets/kadakali1/output.obj")}
        resources={[require("./assets/kadakali1/output1.mtl"),require("./assets/kadakali1/textured_mesh_metallic.jpg-textured_mesh_roughness.png"),require("./assets/kadakali1/textured_mesh.jpg")]}
        position={position}
        scale={[0.15, 0.15, 0.15]}
        rotation={rotation}
        type="OBJ"
        onDrag={changePos}
        onRotate={changeRot}
      />
    );
  } else if (data.object === "Theyyam") {
    return (
      <Viro3DObject
        source={require("./assets/theyy/output.obj")}
          resources={[require("./assets/theyy/output2.mtl"),require("./assets/theyy/textured_mesh_metallic.jpg-textured_mesh_roughness.png"),require("./assets/theyy/textured_mesh.jpg")]}
        position={position}
        scale={[0.15, 0.15, 0.15]}
        rotation={rotation}
        type="OBJ"
        onDrag={changePos}
        onRotate={changeRot}
      />
    );
  } else {
    return (
      <Viro3DObject
        source={require("./assets/jatayu/output.obj")}
        resources={[require("./assets/jatayu/output0.mtl"),require("./assets/jatayu/textured_mesh_metallic.jpg-textured_mesh_roughness.png"),require("./assets/jatayu/textured_mesh.jpg")]}
        position={position}
        scale={[0.2, 0.2, 0.2]}
        rotation={rotation}
        type="OBJ"
        onDrag={changePos}
        onRotate={changeRot}
      />
    );
  }
  return null;
})()}

    </ViroARScene>
  );
};

export default () => {
  const [select, setSelect] = useState("Kathakali");
  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: InitialScene,
        }}
        viroAppProps={{ object: select }}
        style={styles.f1}
      />
      <View style={styles.bar}>
        <TouchableOpacity
          style={styles.av}
          onPress={() => setSelect("Kathakali")}
        >
          <Text style={styles.text}>Kathakali</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rb} onPress={() => setSelect("Theyyam")}>
          <Text style={styles.text}>Theyyam</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rb} onPress={() => setSelect("JatayuRock")}>
          <Text style={styles.text}>Jatayu Rock</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#11f409ff",
    textAlignVertical: "center",
    textAlign: "center",
  },
  text: {
    fontSize: 20,
  },
  bar: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  av: {
    marginTop: 10,
    backgroundColor: "#ffcc00",
    padding: 10,
    borderRadius: 5,
  },
  rb: {
    marginTop: 10,
    backgroundColor: "#00ccff",
    padding: 10,
    borderRadius: 5,
  },
});
