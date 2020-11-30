import React,{Component,Fragment} from "react"
import axios from 'axios'
/*
     React
      1. class 기반
         1) 변수의 종류 (state,props,ref)
         2) 생명주기
            constructor = componentWillMount = render =componentDidMount
      2. function 기반 (16버전부터 권장)
         전역변수,멤버변수(X)
         ================= hooks
      3. router : 화면
      4. redux : MVC구조
      5. saga,mobx (Spring)
      6. 배포 (webpack)
 */
class App extends Component{
  // 생성 => 생성자 함수
  // 변수 선언 , 이벤트 등록
  constructor(props) {
    super(props);
    // 변수 선언 => 멤버 변수
    // state: 데이터변경이 가능  , props: 고정 데이터
    this.state={
       recipe:[],
       page:1
    }
    // 이벤트 처리
    this.prev=this.prev.bind(this);
    this.next=this.next.bind(this);
  }
  prev(){
      this.state.page=this.state.page>1?this.state.page-1:this.state.page;
      let _this=this;
      // http://localhost:3355/recipe?page=1
      axios.get("http://localhost:3355/recipe",{
          params:{
              page:this.state.page
          }
      }).then(function (response){
          console.log(response.data)
          _this.setState({recipe:response.data})
      });
  }
  next(){
      this.state.page=this.state.page<3000?this.state.page+1:this.state.page;
      let _this=this;
      // http://localhost:3355/recipe?page=1
      axios.get("http://localhost:3355/recipe",{
          params:{
              page:this.state.page
          }
      }).then(function (response){
          console.log(response.data)
          _this.setState({recipe:response.data})
      });
  }
  // 메모리에 HTML을 올리기 전 상태
  componentWillMount() {
     // nodejs로 부터 데이터 받기
     let _this=this;
     // http://localhost:3355/recipe?page=1
     axios.get("http://localhost:3355/recipe",{
         params:{
           page:1
         }
     }).then(function (response){
       console.log(response.data)
        _this.setState({recipe:response.data})
     });

    /*
       then(function(response){

       })
     */

  }
  // HTML이 메모리에 올라간 상태 => 브라우저에 화면 출력
  // window.onload , $(function(){})
  // jquery,ajax연결
  componentDidMount() {
  }
  // 메모리에 올라갈 HTML을 작성하는 위치
    // JSX => JavaScript+XML
  render(){
      // for(RecipeVO vo:recipe)
      const html=this.state.recipe.map((m)=>
          <div className="col-md-4">
              <div className="thumbnail">
                      <img src={m.poster} alt="Lights" style={{"width":"100%"}}/>
                          <div className="caption">
                              <p>{m.title}</p>
                          </div>
              </div>
          </div>
      )
    return (
        <Fragment>
            <div style={{"height":"130px"}}></div>
            <div className={"row"}>
                {html}
            </div>
            <div className={"row"}>
                <div className={"text-center"}>
                    <button className={"btn btn-sm btn-danger"} onClick={this.prev}>이전</button>
                    {this.state.page} page / 3000 pages
                    <button className={"btn btn-sm btn-info"} onClick={this.next}>다음</button>
                </div>
            </div>
        </Fragment>
    )
  }
}
export default App;