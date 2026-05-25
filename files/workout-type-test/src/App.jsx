import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  {axis:"EI",icon:"⚡",q:"에너지를 얻는 방식은?",left:"사람들과 함께할 때 충전",right:"혼자만의 시간으로 충전"},
  {axis:"EI",icon:"🚀",q:"새로운 걸 시작할 때?",left:"친구 꼬셔서 같이",right:"일단 혼자 알아보고 시작"},
  {axis:"EI",icon:"🎧",q:"땀 흘릴 때 더 좋은 건?",left:"옆에 누군가 있는 에너지",right:"나만의 음악과 몰입"},
  {axis:"CF",icon:"🎮",q:"더 재밌을 것 같은 건?",left:"공·도구·상대를 다루는 것",right:"내 몸을 자유자재로 쓰는 것"},
  {axis:"CF",icon:"🧠",q:"게임할 때 내 성향은?",left:"환경 읽고 전략적으로 대응",right:"캐릭터 스탯 올리기에 몰입"},
  {axis:"CF",icon:"👀",q:"더 끌리는 느낌은?",left:"변수를 읽고 대응하는 쾌감",right:"오롯이 나에게 집중하는 느낌"},
  {axis:"RO",icon:"📅",q:"선호하는 약속 스타일은?",left:"시간·장소 딱 정해진 게 편해",right:"그때그때 유동적인 게 좋아"},
  {axis:"RO",icon:"🗺️",q:"여행 스타일은?",left:"계획된 코스, 예약 완료!",right:"발길 닿는 대로 자유롭게"},
  {axis:"RO",icon:"🏠",q:"운동한다면 이상적인 건?",left:"정해진 시간, 같은 곳, 루틴",right:"기분 따라 장소 바꿔가며"},
  {axis:"LP",icon:"🎯",q:"뭔가를 배울 때 나는?",left:"복잡한 기술 익히는 게 재밌어",right:"단순한 걸 깊이 반복이 좋아"},
  {axis:"LP",icon:"🎲",q:"더 끌리는 쪽은?",left:"다양한 동작을 하나씩 마스터",right:"같은 동작을 매일 더 잘하기"},
  {axis:"LP",icon:"🔧",q:"도구를 쓴다면?",left:"다루는 법 배워가는 재미",right:"단순한 도구로 묵묵히 반복"},
  {axis:"AUX_COMP",icon:"🏆",q:"승부욕이 어느 정도야?",left:"지는 거 싫어, 이겨야 재밌어",right:"승부보다 과정이 중요해"},
  {axis:"AUX_DRIVE",icon:"📈",q:"운동 후 더 뿌듯한 건?",left:"기록 달성, 목표 클리어!",right:"'아 기분 좋다~' 그 순간"},
  {axis:"AUX_INT",icon:"🔥",q:"강도는 어느 쪽?",left:"짧고 격하게, 끝나면 쓰러짐",right:"오래 부드럽게, 천천히 즐김"},
];

const TYPES={
  TORL:{name:"필드 위의 장군",en:"FIELD GENERAL",emoji:"⚽",color1:"#1565C0",color2:"#42A5F5",
    tagline:"작전은 내가 짠다. 뛰는 것도 내가 뛴다.",
    desc:"사람들이랑 같이 뛰면서 판을 읽고 전략 짜는 게 너한테 딱인 스타일. 축구나 농구 같은 팀 스포츠 한번 해봐, 경기장에서 지휘하는 순간 소름 돋을 거야.",
    sports:["축구 ⚽","농구 🏀","배구 🏐","야구 ⚾"],hashTag:"#필드위의장군 #팀플고트"},
  TORP:{name:"페이스메이커",en:"PACEMAKER",emoji:"🏃",color1:"#00838F",color2:"#26C6DA",
    tagline:"옆에서 '한 바퀴만 더' 해주는 사람, 그게 나야",
    desc:"혼자 하면 금방 질리는데 누군가랑 같이 묵묵히 달리면 끝까지 가는 타입. 러닝크루 한번 들어가 봐, 같이 뛰는 에너지가 너한테 최고의 연료야.",
    sports:["러닝크루 🏃","조정 🚣","그룹사이클 🚴"],hashTag:"#페이스메이커 #같이뛰자"},
  TOFL:{name:"바람 따라 사는",en:"WIND CHASER",emoji:"🏄",color1:"#00ACC1",color2:"#4DD0E1",
    tagline:"파도가 부르면 가야지. 계획은 자연이 세워줌",
    desc:"틀에 갇히는 거 싫고, 자연 속에서 친구들이랑 새로운 거 도전하는 게 너의 에너지원. 서핑이나 스노보드 한번 타봐, 파도 앞에 서는 순간 인생 운동 만날 거야.",
    sports:["서핑 🏄","스노보드 🏂","래프팅 🚣","윈드서핑 🌊"],hashTag:"#바람따라사는 #자연이경기장"},
  TOFP:{name:"놀이터 대장",en:"PLAYGROUND BOSS",emoji:"🥏",color1:"#F9A825",color2:"#FFD54F",
    tagline:"규칙? 느슨하게. 장소? 아무 데나. 재밌으면 됐지",
    desc:"운동이라고 하면 무겁게 느끼는 너, 사실 놀면서 하는 게 제일 잘 맞아. 친구들이랑 프리스비나 족구 한번 해봐, 놀다 보면 어느새 땀 흠뻑이야.",
    sports:["프리스비 🥏","비치발리볼 🏖️","족구 ⚽","캐치볼 🥎"],hashTag:"#놀이터대장 #운동이놀이"},
  TIRL:{name:"안무 1열 센터",en:"CENTER STAGE",emoji:"💃",color1:"#AD1457",color2:"#F06292",
    tagline:"거울 앞 1열, 음악이 시작되면 본능이 깨어남",
    desc:"음악 틀면 몸이 먼저 반응하는 너, 리듬 따라 움직이면서 동작 맞춰가는 재미를 알면 못 빠져나와. 줌바나 그룹댄스 한번 가봐, 거울 속 내 모습에 동결건조 하고 싶어질 거야.",
    sports:["줌바 🕺","그룹댄스 💃","에어로빅 🎶","리듬복싱 🥊"],hashTag:"#1열센터 #리듬본능"},
  TIRP:{name:"불꽃 체력전",en:"FIRE POWER",emoji:"🔥",color1:"#E65100",color2:"#FF8A65",
    tagline:"옆 사람이 포기할 때, 한 세트 더 하는 사람",
    desc:"그룹 에너지 속에서 한계까지 밀어붙이는 쾌감이 너한테 딱인 자극. 크로스핏이나 스피닝 한번 가봐, 옆 사람이랑 같이 죽을 듯 뛰고 나면 세상 뿌듯할 거야.",
    sports:["크로스핏 💥","스피닝 🚲","부트캠프 🎖️","F45 🔥"],hashTag:"#불꽃체력전 #한계돌파"},
  TIFL:{name:"아티스트 댄서",en:"ARTIST DANCER",emoji:"🩰",color1:"#6A1B9A",color2:"#CE93D8",
    tagline:"몸으로 대화하는 법을 아는 사람",
    desc:"새로운 기술 배우는 거 좋아하고, 사람과 호흡 맞추는 게 즐거운 너한테 파트너 댄스가 찰떡. 살사나 탱고 한번 배워봐, 움직임으로 대화하는 그 느낌에 빠질 거야.",
    sports:["살사 💃","탱고 🌹","아크로요가 🤸","파트너댄스 🩰"],hashTag:"#아티스트댄서 #몸의언어"},
  TIFP:{name:"나와 같이 걸을래",en:"WALK WITH ME",emoji:"🌿",color1:"#2E7D32",color2:"#81C784",
    tagline:"거창한 운동 말고, 옆에 사람이 있으면 충분해",
    desc:"격한 운동은 부담인데 혼자 있는 것도 심심한 너, 사실 같이 걷는 것만으로도 충분해. 산책 모임이나 하이킹 한번 나가봐, 대화하면서 걷다 보면 그게 최고의 운동이야.",
    sports:["그룹하이킹 🥾","함께산책 🚶","캐주얼러닝 🌤️"],hashTag:"#같이걸을래 #걷는게운동"},
  SORL:{name:"고요한 승부사",en:"SILENT STRIKER",emoji:"🎯",color1:"#37474F",color2:"#78909C",
    tagline:"조용히, 정확히, 한 번에. 그게 스타일",
    desc:"시끄러운 거 싫고 혼자 집중하는 게 좋은 너, 정밀한 한 방에 승부 거는 운동이 딱. 골프나 양궁 한번 해봐, 고요한 집중 끝에 정확히 맞추는 그 쾌감이 미쳐.",
    sports:["골프 ⛳","양궁 🏹","사격 🎯","당구 🎱"],hashTag:"#고요한승부사 #한발의미학"},
  SORP:{name:"데이터 러너",en:"DATA RUNNER",emoji:"📊",color1:"#0277BD",color2:"#4FC3F7",
    tagline:"오늘 심박수 구간 3에서 42분 유지 (뿌듯)",
    desc:"숫자로 성장이 보여야 동기부여 되는 너한테 기록형 운동이 찰떡. 혼자 로잉머신이나 사이클 타면서 데이터 쌓아봐, 그래프 올라가는 거 보면 못 멈춰.",
    sports:["실내사이클 🚴","로잉머신 🚣","수영(기록형) 🏊"],hashTag:"#데이터러너 #기록이증명"},
  SOFL:{name:"익스플로러",en:"EXPLORER",emoji:"🧗",color1:"#4527A0",color2:"#7E57C2",
    tagline:"루트를 읽고, 벽을 잡고, 끝까지 혼자 올라간다",
    desc:"매번 같은 건 지루하고 혼자 새로운 도전하는 게 좋은 너, 클라이밍 한번 가봐. 매번 다른 루트를 읽고 공략하는 그 몰입감이 너한테 인생 운동 될 거야.",
    sports:["클라이밍 🧗","볼더링 🪨","산악자전거 🚵","트레일러닝 🌲"],hashTag:"#익스플로러 #나만의루트"},
  SOFP:{name:"자연에 살으리랏다",en:"NATURE BOUND",emoji:"⛰️",color1:"#1B5E20",color2:"#4CAF50",
    tagline:"산이 부르면 가고, 물이 부르면 떠남",
    desc:"실내보다 밖이 좋고, 복잡한 규칙보다 자연 속에서 단순하게 움직이는 게 맞는 타입. 등산이나 트레킹 한번 해봐, 정상에서 보는 풍경 하나면 다음 주 산도 정해져 있을 거야.",
    sports:["등산 ⛰️","트레킹 🥾","카약 🛶","낚시 🎣"],hashTag:"#자연에살으리랏다 #산이부른다"},
  SIRL:{name:"호흡의 장인",en:"BREATH MASTER",emoji:"🧘",color1:"#7B1FA2",color2:"#BA68C8",
    tagline:"숨 하나로 몸과 마음을 정렬하는 수련가",
    desc:"나에게 오롯이 집중하는 시간이 필요한 너, 요가나 필라테스가 딱이야. 호흡 하나하나에 집중하다 보면 몸도 마음도 정렬되는 느낌, 한번 경험하면 루틴이 될 거야.",
    sports:["요가 🧘","필라테스 💫","바레 🩰","태극권 ☯️"],hashTag:"#호흡의장인 #이너피스"},
  SIRP:{name:"거울 앞 조각가",en:"BODY SCULPTOR",emoji:"💪",color1:"#33691E",color2:"#7CB342",
    tagline:"매일 한 겹씩, 내 몸이라는 작품을 쌓는 중",
    desc:"눈에 보이는 변화가 최고의 동기부여인 너, 웨이트 한번 시작해봐. 매일 조금씩 무게 올라가고 거울 속 내 몸이 달라지는 거 보면, 오운완 스토리 안 올릴 수가 없을 거야.",
    sports:["웨이트 🏋️","파워리프팅 🦾","바디빌딩 💪","캘리스테닉스 🤸"],hashTag:"#거울앞조각가 #오운완"},
  SIFL:{name:"무림 고수",en:"URBAN NINJA",emoji:"🥷",color1:"#263238",color2:"#546E7A",
    tagline:"벽을 보면 넘고 싶고, 난간을 보면 올라가야 함",
    desc:"내 몸 하나로 자유자재로 움직이는 게 꿈인 너, 파쿠르나 체조 한번 해봐. 기술 하나씩 익힐 때마다 몸이 새로운 언어를 배우는 느낌, 도시 전체가 너의 수련장이 될 거야.",
    sports:["파쿠르 🤸","체조 🏅","프리스타일댄스 🕺","카포에라 🥋"],hashTag:"#무림고수 #도시가수련장"},
  SIFP:{name:"난 내 갈 길을 간다",en:"MY OWN PACE",emoji:"🚶",color1:"#546E7A",color2:"#90A4AE",
    tagline:"세상이 빨라도 나는 내 속도로 간다",
    desc:"남들 페이스에 맞추는 거 싫고 내 기분 따라 움직이고 싶은 너, 그게 다 맞아. 오늘은 산책, 내일은 홈트, 모레는 조깅 — 내 속도가 정답이야. 부담 없이 시작하면 그게 운동이야.",
    sports:["산책 🚶","홈트 🏠","조깅 🌤️","스트레칭 🧘‍♂️"],hashTag:"#내갈길을간다 #내속도가정답"},
};

const AXIS_META=[
  {id:"EI",lCode:"T",rCode:"S",lLabel:"함께",rLabel:"혼자"},
  {id:"CF",lCode:"O",rCode:"I",lLabel:"외부",rLabel:"나"},
  {id:"RO",lCode:"R",rCode:"F",lLabel:"루틴",rLabel:"자유"},
  {id:"LP",lCode:"L",rCode:"P",lLabel:"기술",rLabel:"반복"},
];

function Confetti({c1,c2}){
  const ref=useRef(null);
  useEffect(()=>{
    if(!ref.current)return;
    const c=ref.current,ctx=c.getContext("2d");
    c.width=window.innerWidth;c.height=window.innerHeight;
    const cols=[c1,c2,"#fff","#FFD54F","#F06292","#4DD0E1"];
    const ps=Array.from({length:80},()=>({x:Math.random()*c.width,y:Math.random()*c.height-c.height,
      w:Math.random()*10+4,h:Math.random()*5+3,color:cols[Math.floor(Math.random()*cols.length)],
      vy:Math.random()*3+2,vx:(Math.random()-.5)*2,rot:Math.random()*360,rv:(Math.random()-.5)*8}));
    let raf;(function draw(){ctx.clearRect(0,0,c.width,c.height);let alive=false;
      ps.forEach(p=>{p.y+=p.vy;p.x+=p.vx;p.rot+=p.rv;if(p.y<c.height+50)alive=true;
        ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);
        ctx.fillStyle=p.color;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();});
      if(alive)raf=requestAnimationFrame(draw);})();
    return()=>cancelAnimationFrame(raf);
  },[]);
  return <canvas ref={ref} style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:50}}/>;
}

function BellCurve({value,color,lCode,rCode,lLabel,rLabel}){
  // value: negative=left, positive=right, range roughly -6 to +6
  const pct=Math.min(Math.max(((value+6)/12)*100,8),92);
  const lPct=Math.round(Math.min(Math.max(50-(value/6)*50,5),95));
  const rPct=100-lPct;
  const leftWins=value<=0;
  return(
    <div style={{marginBottom:22}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{width:26,height:26,borderRadius:8,background:leftWins?`${color}25`:"rgba(255,255,255,0.04)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,
            color:leftWins?color:"rgba(255,255,255,0.2)"}}>{lCode}</span>
          <span style={{fontSize:12,color:leftWins?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.3)",fontWeight:600}}>{lLabel}</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:12,color:!leftWins?"rgba(255,255,255,0.7)":"rgba(255,255,255,0.3)",fontWeight:600}}>{rLabel}</span>
          <span style={{width:26,height:26,borderRadius:8,background:!leftWins?`${color}25`:"rgba(255,255,255,0.04)",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,
            color:!leftWins?color:"rgba(255,255,255,0.2)"}}>{rCode}</span>
        </div>
      </div>
      <div style={{position:"relative",height:48,marginBottom:6}}>
        <svg viewBox="0 0 300 46" style={{width:"100%",height:"100%"}} preserveAspectRatio="none">
          <defs><linearGradient id={`g-${lCode}${rCode}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity={leftWins?"0.35":"0.06"}/>
            <stop offset="50%" stopColor={color} stopOpacity="0.04"/>
            <stop offset="100%" stopColor={color} stopOpacity={!leftWins?"0.35":"0.06"}/>
          </linearGradient></defs>
          <path d="M0,44 C30,44 60,42 90,35 C120,26 135,8 150,4 C165,8 180,26 210,35 C240,42 270,44 300,44"
            fill={`url(#g-${lCode}${rCode})`} stroke="none"/>
          <path d="M0,44 C30,44 60,42 90,35 C120,26 135,8 150,4 C165,8 180,26 210,35 C240,42 270,44 300,44"
            fill="none" stroke={`${color}25`} strokeWidth="1"/>
          <line x1="150" y1="2" x2="150" y2="44" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2,3"/>
        </svg>
        <div style={{position:"absolute",left:`${pct}%`,top:"50%",transform:"translate(-50%,-50%)",transition:"left 1s cubic-bezier(0.4,0,0.2,1)"}}>
          <div style={{width:14,height:14,borderRadius:"50%",background:color,boxShadow:`0 0 12px ${color}80`,border:"2px solid rgba(255,255,255,0.9)"}}/>
        </div>
      </div>
      <div style={{display:"flex",gap:3,height:5,borderRadius:3,overflow:"hidden"}}>
        <div style={{width:`${lPct}%`,background:`${color}${leftWins?"BB":"35"}`,borderRadius:3,transition:"width 1s ease"}}/>
        <div style={{width:`${rPct}%`,background:`${color}${!leftWins?"BB":"35"}`,borderRadius:3,transition:"width 1s ease"}}/>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
        <span style={{fontSize:11,color:leftWins?color:"rgba(255,255,255,0.2)",fontWeight:700}}>{lPct}%</span>
        <span style={{fontSize:11,color:!leftWins?color:"rgba(255,255,255,0.2)",fontWeight:700}}>{rPct}%</span>
      </div>
    </div>
  );
}

export default function App(){
  const[phase,setPhase]=useState("intro");
  const[qi,setQi]=useState(0);
  const[answers,setAnswers]=useState([]);
  const[picked,setPicked]=useState(null);
  const[result,setResult]=useState(null);
  const[code,setCode]=useState("");
  const[anim,setAnim]=useState("in");
  const[auxTags,setAuxTags]=useState([]);
  const[axisRaw,setAxisRaw]=useState({EI:0,CF:0,RO:0,LP:0});

  function pickVal(val){
    if(picked!==null)return;
    setPicked(val);
    const na=[...answers,{axis:QUESTIONS[qi].axis,value:val}];
    setAnswers(na);
    setTimeout(()=>{setAnim("out");
      setTimeout(()=>{
        if(qi<QUESTIONS.length-1){setQi(qi+1);setPicked(null);setAnim("in");}
        else{
          const sums={EI:0,CF:0,RO:0,LP:0};
          const aux={AUX_COMP:0,AUX_DRIVE:0,AUX_INT:0};
          na.forEach(a=>{if(a.axis.startsWith("AUX"))aux[a.axis]=a.value;else if(sums[a.axis]!==undefined)sums[a.axis]+=a.value;});
          setAxisRaw(sums);
          const c=(sums.EI<=0?"T":"S")+(sums.CF<=0?"O":"I")+(sums.RO<=0?"R":"F")+(sums.LP<=0?"L":"P");
          const tags=[];
          tags.push(aux.AUX_COMP<=0?"🏆 승부욕 강한 편":"☮️ 과정을 즐기는 편");
          tags.push(aux.AUX_DRIVE<=0?"📈 목표 달성형":"😌 오늘의 만족형");
          tags.push(aux.AUX_INT<=0?"🔥 고강도 선호":"🌿 저강도 선호");
          setAuxTags(tags);setCode(c);setResult(TYPES[c]);setPhase("result");
        }
      },280);
    },400);
  }

  function restart(){setPhase("intro");setQi(0);setPicked(null);setResult(null);setCode("");setAuxTags([]);setAnswers([]);setAxisRaw({EI:0,CF:0,RO:0,LP:0});setAnim("in");}

  const progress=phase==="quiz"?((qi+1)/QUESTIONS.length)*100:0;

  return(
    <div style={{minHeight:"100vh",background:phase==="result"&&result?`linear-gradient(160deg,${result.color1}12 0%,#07070b 35%,${result.color2}08 100%)`:"linear-gradient(160deg,#07070b 0%,#0e0e18 50%,#07070b 100%)",fontFamily:"'Pretendard',-apple-system,BlinkMacSystemFont,sans-serif",color:"#fff",position:"relative",overflow:"hidden",transition:"background 0.8s ease"}}>
      <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet"/>
      {phase==="result"&&result&&<Confetti c1={result.color1} c2={result.color2}/>}
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeOut{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-18px)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
        @keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .sdot{border-radius:50%;position:relative;z-index:1;cursor:pointer;transition:all 0.2s cubic-bezier(0.4,0,0.2,1);-webkit-tap-highlight-color:transparent;flex-shrink:0}
        .sdot:hover{transform:scale(1.15)}
        .sdot:active{transform:scale(0.9)}
      `}</style>
      <div style={{maxWidth:440,margin:"0 auto",padding:"20px 20px 40px",minHeight:"100vh",display:"flex",flexDirection:"column"}}>

        {/* INTRO */}
        {phase==="intro"&&(
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",gap:20,animation:"fadeUp 0.7s ease"}}>
            <div style={{fontSize:64,animation:"float 3s ease-in-out infinite"}}>🏋️</div>
            <h1 style={{fontSize:32,fontWeight:900,lineHeight:1.25,letterSpacing:"-1px",margin:0,
              background:"linear-gradient(135deg,#FF6B35,#E53935,#AB47BC,#1565C0)",backgroundSize:"300% 300%",animation:"gradShift 5s ease infinite",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>나에게 맞는{"\n"}운동 유형은?</h1>
            <p style={{fontSize:14,color:"rgba(255,255,255,0.4)",lineHeight:1.7,maxWidth:280,margin:0}}>
              운동이 재미없었던 건{"\n"}아직 <b style={{color:"rgba(255,255,255,0.6)"}}>'내 운동'</b>을 못 만나서예요
            </p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,width:"100%",maxWidth:300,margin:"8px 0"}}>
              {[{icon:"⚡",l:"함께",r:"혼자"},{icon:"🎯",l:"외부",r:"나"},{icon:"📅",l:"루틴",r:"자유"},{icon:"🔧",l:"기술",r:"반복"}].map((a,i)=>(
                <div key={i} style={{padding:"10px 12px",borderRadius:12,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",
                  display:"flex",alignItems:"center",gap:8,fontSize:12,color:"rgba(255,255,255,0.45)",animation:`fadeUp 0.5s ease ${0.1*i}s both`}}>
                  <span style={{fontSize:16}}>{a.icon}</span><span>{a.l}</span><span style={{color:"rgba(255,255,255,0.15)"}}>vs</span><span>{a.r}</span>
                </div>))}
            </div>
            <button onClick={()=>setPhase("quiz")} style={{marginTop:12,padding:"17px 56px",borderRadius:60,border:"none",
              background:"linear-gradient(135deg,#FF6B35,#E53935)",color:"#fff",fontSize:17,fontWeight:800,cursor:"pointer",
              animation:"pulse 2.5s ease-in-out infinite",boxShadow:"0 8px 30px rgba(229,57,53,0.35)",fontFamily:"inherit"}}>
              테스트 시작하기</button>
            <p style={{fontSize:11,color:"rgba(255,255,255,0.2)",margin:0}}>15문항 · 약 1분 30초 소요</p>
          </div>
        )}

        {/* QUIZ — Left-Right Spectrum (Option B) */}
        {phase==="quiz"&&(()=>{
          const cq=QUESTIONS[qi];
          const dots=[{val:-2,sz:30},{val:-1,sz:24},{val:0,sz:18},{val:1,sz:24},{val:2,sz:30}];
          return(
            <div style={{flex:1,display:"flex",flexDirection:"column"}}>
              <div style={{padding:"16px 0 20px"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontSize:12,color:"rgba(255,255,255,0.3)",fontWeight:600}}>{qi+1} / {QUESTIONS.length}</span>
                  <span style={{fontSize:11,color:"rgba(255,255,255,0.2)",fontWeight:600}}>{Math.round(progress)}%</span>
                </div>
                <div style={{height:3,borderRadius:3,background:"rgba(255,255,255,0.06)",overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${progress}%`,borderRadius:3,background:"linear-gradient(90deg,#FF6B35,#E53935)",transition:"width 0.5s cubic-bezier(0.4,0,0.2,1)"}}/>
                </div>
              </div>
              <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",
                animation:anim==="in"?"fadeUp 0.35s ease":"fadeOut 0.25s ease"}}>
                <div style={{textAlign:"center",marginBottom:28}}>
                  <span style={{fontSize:42,display:"block",marginBottom:12}}>{cq.icon}</span>
                  <h2 style={{fontSize:20,fontWeight:800,lineHeight:1.45,margin:0,wordBreak:"keep-all"}}>{cq.q}</h2>
                </div>

                {/* LEFT-RIGHT SPECTRUM */}
                <div style={{display:"flex",alignItems:"stretch",borderRadius:16,overflow:"hidden",border:"1px solid rgba(255,255,255,0.08)"}}>
                  {/* Left option */}
                  <div style={{flex:1,padding:"16px 12px",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",
                    fontSize:13.5,lineHeight:1.45,wordBreak:"keep-all",transition:"all 0.3s ease",
                    background:picked!==null&&picked<0?"rgba(255,107,53,0.1)":"rgba(255,255,255,0.03)",
                    color:picked!==null&&picked<0?"#FF6B35":picked!==null&&picked>0?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.75)",
                    fontWeight:picked!==null&&picked<0?700:500,
                    borderRight:"1px solid rgba(255,255,255,0.06)"}}>
                    {cq.left}
                  </div>

                  {/* Dots */}
                  <div style={{display:"flex",alignItems:"center",gap:7,padding:"18px 12px",background:"rgba(255,255,255,0.015)",position:"relative"}}>
                    <div style={{position:"absolute",left:16,right:16,top:"50%",height:2,background:"rgba(255,255,255,0.06)",transform:"translateY(-50%)"}}/>
                    {dots.map((d,i)=>{
                      const isP=picked===d.val;
                      const isDim=picked!==null&&!isP;
                      const isCenter=d.val===0;
                      return(
                        <div key={i} className="sdot" onClick={()=>pickVal(d.val)} style={{
                          width:isP?d.sz+6:d.sz,height:isP?d.sz+6:d.sz,
                          background:isP?"#FF6B35":isCenter?"rgba(255,255,255,0.06)":"rgba(255,255,255,0.04)",
                          border:isP?"3px solid rgba(255,255,255,0.9)":isCenter?"2px solid rgba(255,255,255,0.1)":`2px solid rgba(255,255,255,${0.06+Math.abs(d.val)*0.03})`,
                          boxShadow:isP?"0 0 16px rgba(255,107,53,0.5)":"none",
                          opacity:isDim?0.2:1,
                          display:"flex",alignItems:"center",justifyContent:"center",
                        }}>
                          {isP&&<div style={{width:5,height:5,borderRadius:"50%",background:"#fff"}}/>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Right option */}
                  <div style={{flex:1,padding:"16px 12px",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",
                    fontSize:13.5,lineHeight:1.45,wordBreak:"keep-all",transition:"all 0.3s ease",
                    background:picked!==null&&picked>0?"rgba(255,107,53,0.1)":"rgba(255,255,255,0.03)",
                    color:picked!==null&&picked>0?"#FF6B35":picked!==null&&picked<0?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.75)",
                    fontWeight:picked!==null&&picked>0?700:500,
                    borderLeft:"1px solid rgba(255,255,255,0.06)"}}>
                    {cq.right}
                  </div>
                </div>
              </div>
            </div>);
        })()}

        {/* RESULT */}
        {phase==="result"&&result&&(
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",gap:16,paddingTop:16}}>
            <div style={{background:`linear-gradient(160deg,${result.color1}15,#101016 28%,#101016 72%,${result.color2}12)`,
              borderRadius:24,padding:"32px 24px",border:`1px solid ${result.color1}25`,position:"relative",overflow:"hidden",
              animation:"scaleIn 0.55s cubic-bezier(0.16,1,0.3,1)"}}>
              <div style={{position:"absolute",top:-50,right:-50,width:160,height:160,borderRadius:"50%",background:`radial-gradient(circle,${result.color1}18,transparent 70%)`,filter:"blur(35px)"}}/>
              <div style={{position:"absolute",bottom:-30,left:-30,width:120,height:120,borderRadius:"50%",background:`radial-gradient(circle,${result.color2}12,transparent 70%)`,filter:"blur(25px)"}}/>
              <div style={{position:"relative",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
                <span style={{fontSize:10,color:"rgba(255,255,255,0.2)",fontWeight:700,letterSpacing:"2px"}}>MY WORKOUT TYPE</span>
                <span style={{fontSize:10,color:"rgba(255,255,255,0.15)"}}>@fit.type.test</span>
              </div>
              <div style={{position:"relative",textAlign:"center"}}>
                <div style={{fontSize:52,marginBottom:6,animation:"float 3s ease-in-out infinite"}}>{result.emoji}</div>
                <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:8}}>
                  {code.split("").map((l,i)=>(<span key={i} style={{width:34,height:34,borderRadius:10,background:`${result.color1}18`,
                    border:`1px solid ${result.color1}30`,display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:15,fontWeight:900,color:result.color1,animation:`fadeUp 0.4s ease ${0.08*i}s both`}}>{l}</span>))}
                </div>
                <div style={{fontSize:11,fontWeight:700,color:result.color1,letterSpacing:"3px",marginBottom:6,opacity:0.7}}>{result.en}</div>
                <h2 style={{fontSize:28,fontWeight:900,margin:"0 0 4px",letterSpacing:"-1px",
                  background:`linear-gradient(135deg,${result.color1},${result.color2})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                  {result.name}</h2>
                <p style={{fontSize:14,color:"rgba(255,255,255,0.45)",margin:"0 0 24px",fontWeight:500}}>"{result.tagline}"</p>

                {/* Bell Curve Axis Analysis */}
                <div style={{background:"rgba(0,0,0,0.3)",borderRadius:16,padding:"20px 18px 8px",marginBottom:16,border:"1px solid rgba(255,255,255,0.04)"}}>
                  <p style={{fontSize:11,color:"rgba(255,255,255,0.25)",fontWeight:700,margin:"0 0 16px",letterSpacing:"1.5px",textAlign:"center"}}>성향 분석</p>
                  {AXIS_META.map(ax=>(
                    <BellCurve key={ax.id} value={axisRaw[ax.id]} color={result.color1}
                      lCode={ax.lCode} rCode={ax.rCode} lLabel={ax.lLabel} rLabel={ax.rLabel}/>
                  ))}
                </div>

                {/* Aux Tags */}
                <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",marginBottom:16}}>
                  {auxTags.map((t,i)=>(<span key={i} style={{padding:"6px 12px",borderRadius:20,background:"rgba(255,255,255,0.04)",
                    border:"1px solid rgba(255,255,255,0.08)",fontSize:12,color:"rgba(255,255,255,0.5)",fontWeight:600}}>{t}</span>))}
                </div>

                <p style={{fontSize:13.5,lineHeight:1.75,color:"rgba(255,255,255,0.55)",margin:"0 0 20px",textAlign:"left",wordBreak:"keep-all"}}>{result.desc}</p>

                <div style={{background:"rgba(255,255,255,0.02)",borderRadius:14,padding:"16px",border:"1px solid rgba(255,255,255,0.05)",marginBottom:12}}>
                  <p style={{fontSize:11,color:"rgba(255,255,255,0.3)",fontWeight:700,margin:"0 0 10px",letterSpacing:"1px"}}>이런 운동 해봐!</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center"}}>
                    {result.sports.map((s,i)=>(<span key={i} style={{padding:"7px 14px",borderRadius:10,background:`${result.color1}10`,
                      border:`1px solid ${result.color1}20`,fontSize:13.5,fontWeight:600,color:"rgba(255,255,255,0.75)",
                      animation:`fadeUp 0.35s ease ${0.08*i}s both`}}>{s}</span>))}
                  </div>
                </div>
                <p style={{fontSize:12,color:result.color1,opacity:0.5,marginTop:16,marginBottom:0,fontWeight:600}}>{result.hashTag}</p>
              </div>
            </div>

            <div style={{textAlign:"center",animation:"slideUp 0.5s ease 0.25s both"}}>
              <p style={{fontSize:13,color:"rgba(255,255,255,0.35)",margin:"0 0 14px"}}>결과를 캡쳐해서 스토리에 공유해보세요!</p>
              <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                <button onClick={restart} style={{padding:"13px 24px",borderRadius:50,border:"1px solid rgba(255,255,255,0.12)",
                  background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.6)",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>다시 하기</button>
                <button onClick={()=>{
                  const t=`[나의 운동 유형] ${code}\n${result.name} ${result.emoji}\n"${result.tagline}"\n\n추천 운동: ${result.sports.join(", ")}\n\n나에게 맞는 운동을 찾아보세요!`;
                  if(navigator.share)navigator.share({title:"운동 유형 테스트",text:t});
                  else{navigator.clipboard.writeText(t);alert("결과가 복사되었어요! 📋");}
                }} style={{padding:"13px 24px",borderRadius:50,border:"none",background:`linear-gradient(135deg,${result.color1},${result.color2})`,
                  color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:`0 6px 20px ${result.color1}35`}}>공유하기 ✨</button>
              </div>
            </div>

            <div style={{marginTop:8,animation:"slideUp 0.5s ease 0.4s both"}}>
              <p style={{fontSize:11,color:"rgba(255,255,255,0.2)",textAlign:"center",margin:"0 0 10px",fontWeight:600,letterSpacing:"1px"}}>전체 16유형</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
                {Object.entries(TYPES).map(([k,t])=>(<div key={k} style={{padding:"10px 4px",borderRadius:10,textAlign:"center",
                  background:k===code?`${t.color1}12`:"rgba(255,255,255,0.015)",border:k===code?`1.5px solid ${t.color1}35`:"1px solid rgba(255,255,255,0.04)"}}>
                  <span style={{fontSize:16}}>{t.emoji}</span>
                  <p style={{fontSize:8.5,fontWeight:800,margin:"4px 0 1px",color:k===code?t.color1:"rgba(255,255,255,0.3)"}}>{k}</p>
                  <p style={{fontSize:7.5,color:"rgba(255,255,255,0.2)",margin:0,fontWeight:600,lineHeight:1.2}}>{t.name}</p>
                </div>))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
