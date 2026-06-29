// 세무사 살롱급 사이트 제너레이터 — LEADS.md 데이터로 9개 풀데스크톱 사이트 생성
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const PH = {
  hero: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=72',
  office: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1000&q=72',
  handshake: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=72',
  charts: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=72',
  desk: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=72',
  building: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=72',
  docs: 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=900&q=72',
};

// SVG 아이콘 (이모지 대체)
const I = {
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M19 17H6a2 2 0 0 0-2 2"/></svg>',
  receipt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18l2-1.4L9 21l2-1.4L13 21l2-1.4L17 21l2-1.4V3l-2 1.4L15 3l-2 1.4L11 3 9 4.4 7 3z"/><path d="M8 8h8M8 12h8"/></svg>',
  calc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h.01M15 11h.01M8 15h2M12 15h.01M15 15h.01M8 18h2"/></svg>',
  building2: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01M10 21v-3h4v3"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11 12 4l8 7"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8M12 8v13M12 8S10 4 7.5 4 5 8 5 8h7Zm0 0s2-4 4.5-4S19 8 19 8h-7Z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/></svg>',
  briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/></svg>',
  rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5a2.1 2.1 0 0 0-2.5-2.5z"/><path d="M9 14a14 14 0 0 1 7-10c2 0 4 2 4 4a14 14 0 0 1-10 7z"/><path d="M14 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L17 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
};

// 업무 카드 사전
const SVC = {
  기장:   {ic:I.book, t:'기장 대행', d:'매입·매출 정리부터 4대보험·원천세까지, 매달 챙길 일을 통째로 맡아 처리합니다.'},
  종소세: {ic:I.receipt, t:'종합소득세 신고', d:'공제·경비를 빠짐없이 챙겨 5월 종소세를 최대한 줄여 드립니다.'},
  부가세: {ic:I.calc, t:'부가가치세 신고', d:'1·7월 부가세 신고와 매입세액 공제까지 정확하게 처리합니다.'},
  법인세: {ic:I.building2, t:'법인세 · 결산', d:'법인 결산과 법인세 신고, 가지급금·세무리스크 관리까지 함께 봅니다.'},
  양도세: {ic:I.home, t:'양도소득세', d:'부동산·주식 양도 시점과 비과세 요건을 미리 잡아 절세 시나리오를 짭니다.'},
  상속증여:{ic:I.gift, t:'상속 · 증여세', d:'사전 증여 설계부터 상속 신고까지, 가족 자산을 지키는 절세 플랜을 세웁니다.'},
  창업:   {ic:I.rocket, t:'창업 · 사업자등록', d:'업종·과세유형 선택부터 사업자등록, 초기 세무 세팅을 처음부터 돕습니다.'},
  조사:   {ic:I.shield, t:'세무조사 대응', d:'소명자료 준비와 대응 전략으로 가산세를 방어합니다.'},
  절세:   {ic:I.chart, t:'절세 컨설팅', d:'지금 내는 세금이 적정한지 진단하고, 합법적 절세 여지를 찾아 드립니다.'},
  감사:   {ic:I.briefcase, t:'회계 · 결산 감사', d:'공인회계사(CPA)가 재무제표 결산과 외부감사 대응까지 책임집니다.'},
  IT:     {ic:I.rocket, t:'스타트업 · IT 세무', d:'벤처·법인 전환, 스톡옵션·R&D 세액공제 등 IT 기업 특화 세무를 다룹니다.'},
};

const leads = [
  { slug:'gangdong-seolyeongjin', name:'설영진세무회계', rep:'설영진', mono:'薛', phone:'02-471-6171',
    area:'서울 강동구', addr:'서울 강동구 천호동 · 비대면 전국', focusEy:'개인사업자 기장·종합소득세 전문',
    h1:'세금, 더 내고 계신지도<br><em>모릅니다.</em>', sub:'바쁜 사장님 대신 숫자를 지킵니다. 강동구 마을세무사 설영진이 개인사업자 기장부터 종합소득세 절세까지 직접 챙깁니다.',
    svc:['기장','종소세','부가세','절세'] },
  { slug:'seongbuk-dareum', name:'다룸세무회계', rep:'정다영', mono:'鄭', phone:'010-9656-6559',
    area:'서울 성북구', addr:'서울 성북구 · 비대면 전국', focusEy:'부가세·소득세·기장 전문',
    h1:'장부 걱정,<br><em>이제 다룸</em>이 합니다.', sub:'영수증 한 장까지 꼼꼼히. 성북구 다룸세무회계가 개인사업자·프리랜서의 기장과 신고를 산뜻하게 정리해 드립니다.',
    svc:['기장','부가세','종소세','절세'] },
  { slug:'bupyeong-honggwangpyo', name:'홍광표세무회계', rep:'홍광표', mono:'洪', phone:'032-527-3184',
    area:'인천 부평구', addr:'인천 부평구 · 비대면 전국', focusEy:'개인사업자 기장·종합소득세 전문',
    h1:'사장님은 사업에만,<br><em>세금은 제가.</em>', sub:'인천 부평 홍광표세무회계가 동네 사장님의 기장과 종합소득세를 직접 챙깁니다. 지금 내는 세금, 제대로 절세되고 있는지 무료로 점검해 드립니다.',
    svc:['기장','종소세','부가세','창업'] },
  { slug:'gangnam-jeonyeongseok', name:'세무사 전영석', rep:'전영석', mono:'全', phone:'0507-0464-6161',
    area:'서울 강남구', addr:'서울 강남구 · 비대면 전국', focusEy:'양도·상속·증여세 전문',
    h1:'자산을 지키는<br><em>세무 설계.</em>', sub:'부동산·주식 양도부터 상속·증여까지. 강남 전영석 세무사가 세금 나오기 전에 미리 설계해 자산을 지킵니다.',
    svc:['양도세','상속증여','절세','종소세'] },
  { slug:'bundang-hyebom', name:'혜봄세무회계', rep:'김혜지', mono:'金', phone:'0507-0464-0570',
    area:'경기 성남 분당구', addr:'경기 성남시 분당구 · 비대면 전국', focusEy:'상속·증여·종합소득세 전문',
    h1:'물려주는 마음까지<br><em>지키는 세무.</em>', sub:'분당 혜봄세무회계가 상속·증여 설계와 종합소득세 절세를 함께 봅니다. 가족 자산을 가장 적은 세금으로 지키는 길을 찾아 드립니다.',
    svc:['상속증여','양도세','종소세','절세'] },
  { slug:'songpa-jaeyul', name:'세무회계 재율', rep:'오유리', mono:'吳', phone:'',
    area:'서울 송파구 방이', addr:'서울 송파구 방이동 · 비대면 전국', focusEy:'개인사업자 기장·종합소득세 전문',
    h1:'기장부터 절세까지,<br><em>재율</em>이 챙깁니다.', sub:'송파 방이 세무회계 재율이 개인사업자와 프리랜서의 기장·종합소득세를 책임집니다. 첫 점검은 부담 없이 무료로 도와드립니다.',
    svc:['기장','종소세','부가세','절세'] },
  { slug:'mapo-kwonohyun', name:'세무사 권오현', rep:'권오현', mono:'權', phone:'0507-1389-6162',
    area:'서울 마포구', addr:'서울 마포구 · 비대면 전국', focusEy:'종소세·법인세 · IT/스타트업 특화',
    h1:'성장하는 회사의<br><em>세무 파트너.</em>', sub:'마포 권오현 세무사가 스타트업·IT 기업의 법인 세무와 대표님 종합소득세를 함께 챙깁니다. 세액공제 하나까지 놓치지 않습니다.',
    svc:['IT','법인세','기장','절세'] },
  { slug:'yongin-ireum', name:'이룸세무회계', rep:'이현창', repSuffix:' 공인회계사', mono:'李', phone:'070-7733-1117',
    area:'경기 용인 수지', addr:'경기 용인시 수지구 · 비대면 전국', focusEy:'법인·개인 기장 / 회계감사',
    h1:'회계사가 직접 보는<br><em>법인 세무.</em>', sub:'용인 수지 이룸세무회계, 공인회계사(CPA)가 법인 기장과 결산·감사 대응까지 직접 책임집니다. 숫자 위에서 회사의 다음을 함께 설계합니다.',
    svc:['법인세','감사','기장','절세'] },
  { slug:'nowon-seungin', name:'승인세무회계', rep:'백승인', mono:'白', phone:'02-6956-3358',
    area:'서울 노원구 공릉', addr:'서울 노원구 동일로 · 비대면 전국', focusEy:'기장·종소세·부가세 전문',
    h1:'동네 사장님의<br><em>든든한 세무.</em>', sub:'노원 공릉 마을세무사 승인세무회계가 개인사업자의 기장과 종합소득세·부가세를 가까이서 챙깁니다. 어려운 세금, 쉬운 말로 풀어 드립니다.',
    svc:['기장','종소세','부가세','창업'] },
];

const digits = p => (p||'').replace(/[^0-9]/g,'');

const faqsCommon = [
  ['세무사가 직접 상담하나요?', '네. 직원이 아니라 세무사가 직접 상담하고 신고까지 책임집니다. 처음부터 끝까지 같은 사람이 챙겨 드립니다.'],
  ['기존 세무사에서 옮길 수 있나요?', '가능합니다. 자료 이관 절차를 저희가 대신 처리해 번거로움이 없도록 도와드립니다.'],
  ['비대면으로도 되나요?', '네. 카카오톡·전화·화상으로 전국 어디서나 가능하며, 자료도 사진·파일로 간편하게 주고받습니다.'],
  ['기장료는 얼마인가요?', '매출 규모와 거래 건수에 따라 달라집니다. 첫 상담에서 사업 현황을 보고 합리적인 비용을 먼저 안내해 드립니다.'],
];

function page(L){
  const dg = digits(L.phone);
  const repFull = L.rep + (L.repSuffix||'');
  const svcCards = L.svc.map(k=>SVC[k]).filter(Boolean);
  const telBtn = dg
    ? `<a href="tel:${dg}" class="btn btn-ghost">${I.phone}<span>전화 문의</span></a>`
    : `<a href="#apply" class="btn btn-ghost">${I.phone}<span>상담 문의</span></a>`;
  const footPhone = L.phone ? ` · ${L.phone}` : '';
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${L.name} | ${L.area} 세무사 — 기장·종합소득세·절세 상담</title>
<meta name="description" content="${L.area} 세무사 ${L.rep}. ${L.focusEy}. 첫 상담 무료, 비대면 가능. 지금 무료 세무 점검을 신청하세요." />
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  :root{
    --bg:#F5F4EF; --ink:#19212E; --ink-soft:#5A6473; --line:#E4E1D7;
    --navy:#1C3A5B; --navy-d:#142B44; --navy-deep:#0E1E30; --gold:#B8924E; --gold-d:#9C7838; --gold-soft:#EDE3CE; --cream:#FFFFFF;
    --shadow:0 20px 54px -26px rgba(20,40,64,.36);
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:'Pretendard','Apple SD Gothic Neo','Malgun Gothic',system-ui,sans-serif;background:var(--bg);color:var(--ink);line-height:1.72;-webkit-font-smoothing:antialiased}
  .serif{font-family:'Noto Serif KR','Nanum Myeongjo',serif}
  .wrap{max-width:1120px;margin:0 auto;padding:0 26px}
  a{color:inherit;text-decoration:none}
  .btn{display:inline-flex;align-items:center;gap:9px;font-weight:600;font-size:15px;border-radius:999px;padding:14px 28px;cursor:pointer;border:none;transition:.22s;font-family:inherit}
  .btn svg{width:18px;height:18px;flex:none}
  .btn-navy{background:var(--navy);color:#fff;box-shadow:0 12px 28px -12px rgba(28,58,91,.7)}
  .btn-navy:hover{background:var(--navy-d);transform:translateY(-1px)}
  .btn-gold{background:var(--gold);color:#fff}
  .btn-gold:hover{background:var(--gold-d);transform:translateY(-1px)}
  .btn-ghost{background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.6);backdrop-filter:blur(2px)}
  .btn-ghost:hover{background:rgba(255,255,255,.24)}
  nav{position:fixed;top:0;left:0;right:0;z-index:30;transition:.3s;background:rgba(245,244,239,0)}
  nav.solid{background:rgba(245,244,239,.93);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
  nav .wrap{display:flex;align-items:center;justify-content:space-between;height:72px}
  .logo{display:flex;align-items:center;gap:11px;font-weight:600;font-size:18px;color:#fff;transition:.3s}
  nav.solid .logo{color:var(--ink)}
  .logo .mk{width:34px;height:34px;border-radius:9px;background:var(--gold);color:#fff;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:600}
  .nlinks{display:flex;gap:28px;font-size:14px;color:rgba(255,255,255,.92)}
  nav.solid .nlinks{color:var(--ink-soft)}
  .nlinks a:hover{color:var(--gold)}
  .nbook{font-size:13px;border:1px solid rgba(255,255,255,.7);color:#fff;padding:9px 18px;border-radius:999px;transition:.2s}
  nav.solid .nbook{border-color:var(--navy);color:var(--navy)}
  .nbook:hover{background:var(--navy);color:#fff;border-color:var(--navy)}
  @media(max-width:780px){.nlinks{display:none}}
  .hero{min-height:100vh;display:flex;align-items:center;position:relative;background-color:#0E1E30;background-image:linear-gradient(108deg,rgba(14,28,46,.92),rgba(14,28,46,.7) 55%,rgba(14,28,46,.4)),url('${PH.hero}');background-size:cover;background-position:center}
  .hero .inner{max-width:640px;color:#fff;padding:118px 0 64px}
  .eyebrow{display:inline-flex;align-items:center;gap:9px;font-size:12px;letter-spacing:.14em;color:#fff;border:1px solid rgba(255,255,255,.42);padding:8px 16px;border-radius:999px}
  .eyebrow .dot{width:6px;height:6px;border-radius:50%;background:var(--gold)}
  .hero h1{font-size:clamp(36px,5.6vw,62px);line-height:1.24;font-weight:600;letter-spacing:-.01em;margin:24px 0 0}
  .hero h1 em{font-style:normal;color:#E6C988}
  .hero p{font-size:17px;color:rgba(255,255,255,.9);margin-top:22px;max-width:500px;font-weight:300}
  .hero-cta{display:flex;gap:13px;margin-top:34px;flex-wrap:wrap}
  .hero-meta{display:flex;gap:32px;margin-top:44px;flex-wrap:wrap}
  .hero-meta div b{display:block;font-size:20px;font-weight:600}
  .hero-meta div span{font-size:12.5px;color:rgba(255,255,255,.72)}
  .strip{background:var(--navy-deep);color:rgba(255,255,255,.72);padding:16px 0;overflow:hidden;white-space:nowrap}
  .strip .row{display:inline-flex;font-size:13px;letter-spacing:.16em;animation:slide 30s linear infinite}
  .strip span{margin-right:42px}.strip span i{font-style:normal;color:var(--gold)}
  @keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  section{padding:100px 0}
  .sec-head{max-width:640px;margin:0 auto 52px;text-align:center}
  .sec-eyebrow{font-size:12px;letter-spacing:.2em;color:var(--gold-d);font-weight:600}
  h2{font-size:clamp(27px,4.2vw,42px);font-weight:600;letter-spacing:-.01em;margin:13px 0;line-height:1.24}
  .sec-head p{color:var(--ink-soft);font-size:16px;font-weight:300}
  .svcgrid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  @media(max-width:780px){.svcgrid{grid-template-columns:1fr}}
  .scard{background:var(--cream);border:1px solid var(--line);border-radius:18px;padding:30px;transition:.25s}
  .scard:hover{box-shadow:var(--shadow);transform:translateY(-3px);border-color:transparent}
  .scard .ic{width:46px;height:46px;border-radius:12px;background:var(--gold-soft);color:var(--navy);display:flex;align-items:center;justify-content:center;margin-bottom:16px}
  .scard .ic svg{width:24px;height:24px}
  .scard h3{font-size:19px;font-weight:600;margin-bottom:8px}
  .scard p{font-size:14px;color:var(--ink-soft);font-weight:300}
  .about{background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
  .about .wrap{display:grid;grid-template-columns:1fr 1.05fr;gap:58px;align-items:center}
  @media(max-width:780px){.about .wrap{grid-template-columns:1fr;gap:36px}}
  .about .photo{aspect-ratio:4/5;border-radius:20px;background-size:cover;background-position:center;background-color:#cdd6e0;box-shadow:var(--shadow);background-image:url('${PH.office}')}
  .about .mono{font-family:'Noto Serif KR',serif;font-size:13px;letter-spacing:.3em;color:var(--gold-d)}
  .about h2{margin-top:6px}
  .about .quote{font-size:20px;font-weight:400;color:var(--ink);line-height:1.6;margin:8px 0 18px}
  .about .quote b{font-weight:600;color:var(--navy)}
  .about p{color:var(--ink-soft);font-size:15.5px;font-weight:300;margin-bottom:13px}
  .credos{list-style:none;margin-top:20px;display:grid;gap:10px}
  .credos li{display:flex;gap:10px;align-items:flex-start;font-size:14.5px}
  .credos li svg{width:18px;height:18px;color:var(--gold);flex:none;margin-top:3px}
  .sign{margin-top:24px;display:flex;align-items:center;gap:14px}
  .sign .av{width:52px;height:52px;border-radius:50%;background:var(--navy);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Noto Serif KR',serif;font-size:20px;border:2px solid var(--gold)}
  .sign b{display:block;font-size:15px}.sign span{font-size:13px;color:var(--ink-soft)}
  .steps{background:var(--navy-deep);color:#fff}
  .steps .sec-eyebrow{color:var(--gold)}.steps h2{color:#fff}
  .stepgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:8px}
  @media(max-width:780px){.stepgrid{grid-template-columns:1fr}}
  .step{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:30px}
  .step .n{font-family:'Noto Serif KR',serif;font-size:30px;color:var(--gold);font-weight:600}
  .step h3{font-size:18px;margin:10px 0 6px;font-weight:600}
  .step p{font-size:14px;color:rgba(255,255,255,.7);font-weight:300}
  .reviews{background:var(--gold-soft)}
  .rgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  @media(max-width:780px){.rgrid{grid-template-columns:1fr}}
  .rcard{background:#fff;border-radius:18px;padding:28px 26px;box-shadow:0 14px 38px -26px rgba(60,50,30,.5)}
  .stars{color:var(--gold);letter-spacing:2px;margin-bottom:12px}
  .rcard p{font-size:14.5px;color:var(--ink);font-weight:300;line-height:1.7}
  .rcard .who{margin-top:15px;font-size:13px;color:var(--ink-soft)}.rcard .who b{color:var(--ink);font-weight:600}
  .info .wrap{display:grid;grid-template-columns:1.05fr 1fr;gap:54px;align-items:center}
  @media(max-width:780px){.info .wrap{grid-template-columns:1fr;gap:36px}}
  .ilist{list-style:none;margin-top:22px}
  .ilist li{display:flex;gap:15px;padding:17px 0;border-bottom:1px solid var(--line)}
  .ilist .ic{width:42px;height:42px;flex:none;border-radius:12px;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--navy)}
  .ilist .ic svg{width:20px;height:20px}
  .ilist b{font-size:15px}.ilist span{display:block;font-size:14px;color:var(--ink-soft);font-weight:300}
  .resv{background:var(--navy-deep);color:#fff;border-radius:22px;padding:40px 38px;box-shadow:var(--shadow)}
  .resv h3{font-size:23px;font-weight:500;margin-bottom:8px}
  .resv .sub{color:rgba(255,255,255,.66);font-size:14px;font-weight:300;margin-bottom:22px}
  .field{margin-bottom:13px}
  .field label{font-size:12.5px;color:rgba(255,255,255,.62);display:block;margin-bottom:6px}
  .field input,.field select{width:100%;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);border-radius:11px;padding:12px 14px;color:#fff;font-family:inherit;font-size:14.5px;outline:none;transition:.2s}
  .field input::placeholder{color:rgba(255,255,255,.4)}
  .field input:focus,.field select:focus{border-color:var(--gold);background:rgba(255,255,255,.1)}
  .field select option{color:#19212e}
  .resv .btn{width:100%;justify-content:center;margin-top:8px}
  .resv .micro{text-align:center;font-size:12px;color:rgba(255,255,255,.5);margin-top:13px}
  .resv-ok{display:none;text-align:center;padding:26px 6px}
  .resv-ok .ck{width:60px;height:60px;border-radius:50%;background:var(--gold);color:#fff;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
  .resv-ok .ck svg{width:30px;height:30px}
  .faqwrap{max-width:760px;margin:0 auto}
  details.faq{border-bottom:1px solid var(--line)}
  .faq summary{cursor:pointer;list-style:none;padding:20px 4px;font-weight:600;font-size:16px;display:flex;justify-content:space-between;align-items:center;gap:14px}
  .faq summary::-webkit-details-marker{display:none}
  .faq summary .qi{flex:none;color:var(--navy);transition:transform .25s}.faq summary .qi svg{width:20px;height:20px;display:block}
  .faq[open] summary .qi{transform:rotate(45deg)}
  .faq p{padding:0 4px 20px;color:var(--ink-soft);font-size:14.8px;font-weight:300}
  footer{background:#0E1E30;color:rgba(255,255,255,.66);padding:50px 0 36px}
  .foot{display:flex;justify-content:space-between;gap:30px;flex-wrap:wrap}
  .foot .logo{color:#fff;font-size:18px;margin-bottom:10px}
  .foot p{font-size:13.5px;font-weight:300;line-height:1.9}
  .copy{margin-top:30px;padding-top:20px;border-top:1px solid rgba(255,255,255,.12);font-size:12px;color:rgba(255,255,255,.4);text-align:center}
</style>
</head>
<body>
<nav id="nav"><div class="wrap">
  <div class="logo"><span class="mk">${L.mono}</span> ${L.name}</div>
  <div class="nlinks">
    <a href="#service">업무 영역</a><a href="#about">세무사 소개</a><a href="#flow">상담 절차</a><a href="#faq">자주 묻는 질문</a>
  </div>
  <a href="#apply" class="nbook">무료 상담</a>
</div></nav>

<header class="hero"><div class="wrap"><div class="inner">
  <span class="eyebrow"><span class="dot"></span>${L.area} · ${L.focusEy}</span>
  <h1 class="serif">${L.h1}</h1>
  <p>${L.sub}</p>
  <div class="hero-cta">
    <a href="#apply" class="btn btn-gold">무료 세무 점검 신청</a>
    ${telBtn}
  </div>
  <div class="hero-meta">
    <div><b>세무사 직접</b><span>상담·신고 책임</span></div>
    <div><b>24시간 내</b><span>회신</span></div>
    <div><b>첫 상담</b><span>무료</span></div>
  </div>
</div></div></header>

<div class="strip"><div class="row">
  <span><i>·</i> 기장 대행</span><span><i>·</i> 종합소득세</span><span><i>·</i> 부가가치세</span><span><i>·</i> 법인세</span><span><i>·</i> 양도·상속·증여</span><span><i>·</i> 절세 컨설팅</span>
  <span><i>·</i> 기장 대행</span><span><i>·</i> 종합소득세</span><span><i>·</i> 부가가치세</span><span><i>·</i> 법인세</span><span><i>·</i> 양도·상속·증여</span><span><i>·</i> 절세 컨설팅</span>
</div></div>

<section id="service"><div class="wrap">
  <div class="sec-head">
    <div class="sec-eyebrow">Services</div>
    <h2 class="serif">맡기면 끝나는 세무</h2>
    <p>매달 챙길 일부터 1년에 한 번뿐인 큰 신고까지, ${L.rep} 세무사가 직접 봅니다.</p>
  </div>
  <div class="svcgrid">
    ${svcCards.map(s=>`<div class="scard"><div class="ic">${s.ic}</div><h3>${s.t}</h3><p>${s.d}</p></div>`).join('\n    ')}
  </div>
</div></section>

<section id="about" class="about"><div class="wrap">
  <div class="photo"></div>
  <div>
    <div class="mono">${L.mono}</div>
    <h2 class="serif">사장님은 사업에만,<br>세금은 제가.</h2>
    <p class="quote">"숫자는 거짓말을 안 합니다. <b>제대로 챙기면 세금은 줄고</b>, 사장님은 본업에만 집중하실 수 있습니다."</p>
    <p>${L.area}에서 ${L.rep} 세무사가 직접 상담하고 신고까지 책임집니다. 직원에게 넘기지 않고, 처음부터 끝까지 같은 사람이 사장님의 숫자를 챙깁니다.</p>
    <ul class="credos">
      <li>${I.check}한국세무사회 정회원 · 세무사 자격 보유</li>
      <li>${I.check}${L.area} 지역 밀착 세무 서비스</li>
      <li>${I.check}${L.focusEy}</li>
      <li>${I.check}세무조사 대응 및 가산세 방어 경험</li>
    </ul>
    <div class="sign"><div class="av">${L.mono}</div><div><b>${repFull}</b><span>${L.name} 대표</span></div></div>
  </div>
</div></section>

<section id="flow" class="steps"><div class="wrap">
  <div class="sec-head"><div class="sec-eyebrow">How it works</div><h2 class="serif">3단계면 충분합니다</h2></div>
  <div class="stepgrid">
    <div class="step"><div class="n">01</div><h3>무료 상담 신청</h3><p>아래 폼에 연락처만 남기시면 됩니다. 1분이면 충분해요.</p></div>
    <div class="step"><div class="n">02</div><h3>현황 진단</h3><p>지금 세무 상태와 절세 여지를 무료로 꼼꼼히 점검해 드립니다.</p></div>
    <div class="step"><div class="n">03</div><h3>맞춤 기장·신고</h3><p>계약 후 매달·매년 모든 신고를 대신 챙깁니다. 사장님은 신경 끄셔도 됩니다.</p></div>
  </div>
</div></section>

<section class="reviews"><div class="wrap">
  <div class="sec-head"><div class="sec-eyebrow">Reviews</div><h2 class="serif">사장님들의 이야기</h2><p>지역 사장님들이 남겨주신 실제 후기가 이 자리에 쌓입니다.</p></div>
  <div class="rgrid">
    <div class="rcard"><div class="stars">★★★★★</div><p>세금이 늘 막연했는데, 매달 정리해 주시고 5월에 환급까지 받았어요. 본업에만 집중할 수 있어 마음이 편합니다.</p><div class="who"><b>개인사업자</b> 사장님 · 기장 + 종소세</div></div>
    <div class="rcard"><div class="stars">★★★★★</div><p>전화하면 세무사님이 직접 받아 쉬운 말로 설명해 주세요. 다른 곳은 직원분이 응대했는데 여긴 다릅니다.</p><div class="who"><b>프리랜서</b> · 종합소득세</div></div>
    <div class="rcard"><div class="stars">★★★★★</div><p>기존 세무사에서 옮기는 게 번거로울 줄 알았는데 이관까지 다 처리해 주셔서 신경 쓸 게 없었어요.</p><div class="who"><b>음식점</b> 사장님 · 기장 이관</div></div>
  </div>
</div></section>

<section id="visit" class="info"><div class="wrap">
  <div>
    <div class="sec-eyebrow">Contact</div>
    <h2 class="serif">편하게 문의하세요</h2>
    <ul class="ilist">
      <li><div class="ic">${I.clock}</div><div><b>상담 시간</b><span>평일 09:00 – 18:00 · 전화·카톡·화상 상담</span></div></li>
      <li><div class="ic">${I.pin}</div><div><b>대상 지역</b><span>${L.addr}</span></div></li>
      <li><div class="ic">${I.phone}</div><div><b>문의</b><span>${L.phone ? L.phone+' · 아래 폼으로 신청 가능' : '아래 폼으로 상담을 신청해 주세요'}</span></div></li>
    </ul>
  </div>
  <div class="resv" id="apply">
    <div id="formBox">
      <h3 class="serif">무료 세무 점검</h3>
      <p class="sub">연락처만 남기시면 24시간 내 ${L.rep} 세무사가 직접 연락드립니다.</p>
      <form id="applyForm" onsubmit="return submitForm(event)">
        <div class="field"><label>성함 / 상호</label><input required placeholder="예) 김사장 또는 OO상회" /></div>
        <div class="field"><label>연락처</label><input required type="tel" placeholder="010-0000-0000" /></div>
        <div class="field"><label>사업 형태</label><select required><option value="">선택</option><option>개인사업자</option><option>프리랜서 · N잡</option><option>법인(설립 예정 포함)</option><option>부동산 · 자산</option><option>아직 미정</option></select></div>
        <div class="field"><label>상담 분야</label><select required><option value="">선택</option><option>기장 대행</option><option>종합소득세</option><option>부가세</option><option>법인세</option><option>양도·상속·증여</option><option>창업 / 사업자등록</option><option>기타</option></select></div>
        <button type="submit" class="btn btn-gold">무료 상담 신청하기</button>
        <p class="micro">※ 제작 시안입니다 — 실제 상담은 접수되지 않으며, 입력 정보는 전송·저장되지 않습니다.</p>
      </form>
    </div>
    <div class="resv-ok" id="resvOk"><div class="ck">${I.check}</div><h3 class="serif">상담 신청이 접수되었습니다</h3><p style="color:rgba(255,255,255,.8);font-weight:300;font-size:14.5px">감사합니다. 24시간 내 세무사가 직접 연락드리겠습니다.</p></div>
  </div>
</div></section>

<section id="faq" style="padding-top:0"><div class="wrap">
  <div class="sec-head"><div class="sec-eyebrow">FAQ</div><h2 class="serif">자주 묻는 질문</h2></div>
  <div class="faqwrap">
    ${faqsCommon.map(([q,a])=>`<details class="faq"><summary>${q}<span class="qi">${I.book&&'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>'}</span></summary><p>${a}</p></details>`).join('\n    ')}
  </div>
</div></section>

<footer><div class="wrap">
  <div class="foot">
    <div><div class="logo serif"><span style="color:var(--gold)">${L.mono}</span> ${L.name}</div><p>${L.addr}<br>평일 09–18시${footPhone}</p></div>
    <div><p style="color:#fff;font-weight:500">${L.name}</p><p><a href="#service">업무 영역</a><br><a href="#about">세무사 소개</a><br><a href="#apply">무료 상담 신청</a></p></div>
  </div>
  <div class="copy">© 2026 ${L.name} · ${L.area} 세무 파트너 &nbsp;|&nbsp; 본 페이지는 ${L.rep} 세무사님께 제안하는 홈페이지 제작 시안입니다.</div>
</div></footer>
<script>
  var nav=document.getElementById('nav');
  function onScroll(){ if(window.scrollY>40)nav.classList.add('solid'); else nav.classList.remove('solid'); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  function submitForm(e){ e.preventDefault(); document.getElementById('formBox').style.display='none'; document.getElementById('resvOk').style.display='block'; return false; }
</script>
</body>
</html>`;
}

let made=[];
for(const L of leads){
  const dir = join(__dirname, L.slug);
  mkdirSync(dir, {recursive:true});
  writeFileSync(join(dir,'index.html'), page(L), 'utf8');
  made.push(L.slug);
}
console.log('GENERATED '+made.length+' sites:\n'+made.join('\n'));
