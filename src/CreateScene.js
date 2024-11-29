import { Scene, PerspectiveCamera, Color } from 'three';

export class CreateScene {
  constructor(info) {
    this.renderer = info.renderer;
    this.elem = document.querySelector(info.placeHolder);
    const rect = this.elem.getBoundingClientRect();

    console.log(rect);

    const bgColor = info.bgColor || '#FFFFFF';
    const fov = info.fov || 75;
    const aspect = rect.width / rect.height;
    const near = info.near || 0.1;
    const far = info.far || 100;
    const cameraPosition = info.cameraPosition || { x: 0, y: 0, z: 3 };

    this.scene = new Scene();
    this.scene.background = new Color(bgColor);

    this.camera = new PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    
    this.scene.add(this.camera);

    this.meshes = [];
  }

  set(func){
    func();
  }

  render(){
    const renderer = this.renderer;
    const rect = this.elem.getBoundingClientRect();
    
    // 화면에서 보이지 않을 경우 renderer 실행하지 않도록
    if(
      rect.top > window.innerHeight ||
      rect.bottom < 0 ||
      rect.left > renderer.domElement.clientWidth ||
      rect.right < 0
    ){
      return;
    };

    // 화면의 영역이 줄어듬에 따라 mesh 들이 비정상적으로 보임.
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();

    const canvasBottom = renderer.domElement.clientHeight - rect.bottom;

    renderer.setScissor(rect.left, canvasBottom, rect.width, rect.height);
    renderer.setViewport(rect.left, canvasBottom, rect.width, rect.height);
    renderer.setScissorTest(true); // 마무리 함수

    renderer.render(this.scene, this.camera);
  }
}