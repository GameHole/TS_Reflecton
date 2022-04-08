import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
function Test()
{
	
}
@ccclass('TestProto')
export class TestProto extends Component 
{
	start ()
	{
		console.log(Test.name);
	}
	//update (deltaTime: number)
	//{
	//}
}