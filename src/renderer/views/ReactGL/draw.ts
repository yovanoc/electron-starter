import { WebGLRenderFunction } from "@devchris/reactgl";
import cube from "./cube";

export const draw: WebGLRenderFunction = x => {
  const modelRender = x.createModelRenderer();

  const light = x.createLight(100, 100, -100, 1.0, 1.0, 1.0, 0.4);
  const camera = x.createCamera(0, 0, 3, 0, 0, 0, 0.1, 1000, 80);

  const material = x.createMaterial();
  material.addDiffuse(require("renderer/assets/testimage.png"));

  const instance = x.createModelInstance(0, 0, 0, 0, 0, 0, 0.5);
  const cubeType = x.createModelType(
    cube.vertices,
    cube.indices,
    cube.normals,
    cube.textureCoords
  );
  cubeType.addMaterial(material);

  modelRender.registerNewModel(cubeType, "cube");
  modelRender.addInstance(instance, "cube");

  const animation = () => {
    x.clear(1.0, 1.0, 1.0, 1.0);
    instance.updateRotation(1, 1, 1);
    modelRender.render(light, camera);
    window.requestAnimationFrame(animation);
  };

  window.requestAnimationFrame(animation);
};
