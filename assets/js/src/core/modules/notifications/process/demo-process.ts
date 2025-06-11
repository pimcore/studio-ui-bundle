import { AbstractMercureProcess } from "@Pimcore/modules/background-processor/process/abstract-mercure-process";
import { topics } from "@Pimcore/modules/execution-engine/topics";

export class DemoProcess extends AbstractMercureProcess {
  protected name: string = "demo-process";
  protected description: string = "Demo process for testing purposes";

  protected topics: string[] = [topics["handler-progress"]];
}
