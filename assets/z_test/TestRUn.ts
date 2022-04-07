import { _decorator, Component, Node } from 'cc';
import { TypeOf } from '../Reflection/Type';
import { Assert } from './Assert';
import { TestContainer } from './TestHelper';
// import { TestClass1 } from './TestMethord';
const { ccclass, property } = _decorator;
@ccclass('TestRUn')
export class TestRUn extends Component 
{
	start ()
	{
		TestContainer.run();
	}
	//update (deltaTime: number)
	//{
	//}
}