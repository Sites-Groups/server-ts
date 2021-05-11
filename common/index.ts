import { instanceMap } from "./injectMap";

export function Controller(options?: { method?: string; url?: string }) {
  return (target, propertyName) => {
    Reflect.defineMetadata(propertyName, options, target);
  };
}

export function Autowired() {
  return (target, propertyKey: string) => {
    const propertyType = Reflect.getMetadata(
      "design:type",
      target,
      propertyKey
    );
    let instance = instanceMap.getInstance(propertyType);
    if (!instance) {
      instance = new propertyType();
      instanceMap.setInstance(propertyType, instance);
    }
    target[propertyKey] = instance;
    return target;
  };
}
