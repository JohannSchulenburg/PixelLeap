namespace Game {
  //import fc = FudgeCore;
  // tslint:disable: no-any
  export interface Platforms  {
  name: string;
  cmpTransform: FudgeCore.ComponentTransform;
  checkCollision: (player: Player) => boolean;
  update?: () => void;
  type: string;
  /* mtxWorld: any;
  mtxWorldInverse: any;
  timestampUpdate: any;
  parent: any;
  children: any;
  nChildren: any;
  components: any;
  captures: any;
  listeners: any;
  worldInverseUpdated: any;
  worldInverse: any;
  active: any;
  isActive: any;
  mtxLocal: any;
  graph: any;
  activate: any;
  getParent: any; 
  getAncestor: any;
  getChild: any;
  getChildren: any;
  getChildrenByName: any;
  appendChild: any;
  addChild: any;
  removeChild: any;
  removeAllChildren: any; 
  findChild: any;
  replaceChild: any;
  isUpdated: any;
  isDescendantOf: any;
  applyAnimation: any;
  getAllComponents: any;
  getComponents: any;
  getComponent: any;
  addComponent: any;
  removeComponent: any;
  serialize: any;
  deserialize: any;
  toHierarchyString: any; 
  addEventListener: any;
  removeEventListener: any;
  dispatchEvent: any;
  broadcastEvent: any;
  broadcastEventRecursive: any;
  getGraphGenerator: any; */
  }
}
