const { useState, useEffect } = React;

// 1. 공통 상태바
const StatusBar = ({ isDark = false }) => (
  <div className={`flex justify-between items-center px-6 pt-3 pb-2 w-full text-[15px] font-semibold z-50 bg-white ${isDark ? 'text-black' : 'text-black'}`}>
    <span>9:41</span>
    <div className="flex items-center space-x-1.5">
      <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><path d="M1 10.5h3v-3H1v3zm4.5 0h3v-6h-3v6zm4.5 0h3v-9h-3v9zm4.5-12v12h3v-12h-3z"/></svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 12l8-10.5C15.6 1.2 12.2 0 8 0 3.8 0 .4 1.2 0 1.5L8 12z"/></svg>
      <div className="relative w-6 h-3 rounded-[3px] border border-current flex items-center p-[1px]">
        <div className="bg-current h-full rounded-sm" style={{width: '80%'}}></div>
        <div className="absolute -right-[3px] w-[2px] h-[4px] bg-current rounded-r-sm"></div>
      </div>
    </div>
  </div>
);

// 2. 공통 하단 네비게이션 바
const BottomNav = ({ active }) => {
  const navItems = [
    { id: 'home', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>, link: 'home.html' },
    { id: 'history', icon: <><rect x="18" y="3" width="4" height="18" /><rect x="10" y="8" width="4" height="13" /><rect x="2" y="13" width="4" height="8" /></>, link: 'history.html' },
    { id: 'solution', icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /></>, link: 'solution.html' },
    { id: 'wishlist', icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />, link: 'wishlist.html' },
    { id: 'mypage', icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>, link: 'mypage.html' },
  ];

  return (
    <div className="absolute bottom-0 w-full h-[84px] bg-white border-t border-gray-200 flex justify-around items-start pt-4 px-2 z-40">
      {navItems.map(item => (
        <button 
          key={item.id}
          onClick={() => window.location.href = item.link}
          className={`flex flex-col items-center transition active:scale-90 ${active === item.id ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {item.icon}
          </svg>
        </button>
      ))}
    </div>
  );
};

// 3. 소비 돋보기 모달 (디자인 업데이트 및 외부 클릭 닫기 적용)
const ConsumptionModal = ({ isOpen, onClose }) => {
  const [modalStep, setModalStep] = useState(1);
  const [formData, setFormData] = useState({ name: '피자', category: '음식', price: '25,000원', mood: '스트레스 🤯' });

  useEffect(() => { if (isOpen) setModalStep(1); }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setModalStep(2);
    setTimeout(() => setModalStep(3), 2000); // 2초 후 결과창 이동
  };

  return (
    // 배경 클릭 시 onClose 호출되도록 설정 (외부 영역 클릭 닫기 기능)
    <div 
      className="fixed inset-0 z-50 flex flex-col justify-end items-center bg-black/60 backdrop-blur-[2px] pb-6 px-4" 
      onClick={onClose}
    >
      {/* 모달 내부 클릭 시에는 닫히지 않도록 이벤트 버블링 차단 (e.stopPropagation) 
      */}
      <div 
        className="w-full max-w-[360px] max-h-[90vh] bg-white rounded-[24px] flex flex-col overflow-hidden modal-slide-up shadow-2xl relative" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center pt-8 pb-5 border-b border-gray-100 shrink-0">
          <h2 className="text-[20px] font-bold text-black mb-1">소비 돋보기</h2>
          <p className="text-[10px] text-gray-400 font-medium">사고 싶은 물건이 생겼나요?<br/>내 가치관에 맞는 기분 좋은 소비인지 확인해 드릴게요.</p>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-20">
          
          {/* STEP 1: 입력폼 */}
          {modalStep === 1 && (
            <div className="fade-in space-y-6">
              {/* 사진/링크 업로드 폼 */}
              <div>
                <label className="flex items-center text-[12px] font-bold text-black mb-3">
                  <input type="radio" name="uploadType" className="mr-2 accent-black w-3.5 h-3.5" />
                  사진 / 링크 업로드
                </label>
                <div className="w-full h-[60px] rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 bg-white ml-5 w-[calc(100%-20px)]">
                  <div className="flex items-center gap-2 text-[10px]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span>사진을 업로드 하세요</span>
                  </div>
                </div>
              </div>

              {/* 직접 입력 폼 */}
              <div>
                <label className="flex items-center text-[12px] font-bold text-black mb-4">
                  <input type="radio" name="uploadType" className="mr-2 accent-black w-3.5 h-3.5" defaultChecked /> 
                  직접 입력
                </label>
                <div className="space-y-4 pl-6">
                  <div className="flex items-center justify-between"><span className="text-[11px] text-gray-500 font-medium">상품명</span><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-[160px] border border-gray-200 rounded p-1.5 text-[11px] text-center focus:border-black" /></div>
                  <div className="flex items-center justify-between"><span className="text-[11px] text-gray-500 font-medium">상품 카테고리</span><select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-[160px] border border-gray-200 rounded p-1.5 text-[11px] text-center"><option>음식</option></select></div>
                  <div className="flex items-center justify-between"><span className="text-[11px] text-gray-500 font-medium">물건의 가격</span><select value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-[160px] border border-gray-200 rounded p-1.5 text-[11px] text-center"><option>25,000원</option></select></div>
                  <div className="flex items-center justify-between"><span className="text-[11px] text-gray-500 font-medium">현재 내 기분</span><select value={formData.mood} onChange={(e) => setFormData({...formData, mood: e.target.value})} className="w-[160px] border border-gray-200 rounded p-1.5 text-[11px] text-center"><option>스트레스 🤯</option></select></div>
                </div>
              </div>
              <button onClick={handleConfirm} className="w-full bg-[#EEEEEE] text-black font-bold py-3 rounded-full mt-8 active:scale-95 transition">확인하기</button>
            </div>
          )}

          {/* STEP 2: 로딩 화면 */}
          {modalStep === 2 && (
             <div className="fade-in h-full flex flex-col items-center justify-center mt-[40px]">
               <div className="pulse-slow mb-6">
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7A8B99" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
               </div>
               <p className="text-[13px] font-bold text-center text-gray-800 leading-relaxed">지수 님을 위한 최선의 선택을 고민중<br/>이에요 ☁️...</p>
             </div>
          )}

          {/* STEP 3: 결과 화면 */}
          {modalStep === 3 && (
             <div className="fade-in pb-2">
               
               {/* 상단 요약 뷰 */}
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-[80px] h-[60px] border border-gray-300 bg-white flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                 </div>
                 <div className="flex-1 flex flex-col justify-center space-y-1">
                   <div className="flex justify-between text-[10px]"><span className="text-gray-500 w-16">상품명</span><span className="font-bold text-black text-right w-full">|  {formData.name}</span></div>
                   <div className="flex justify-between text-[10px]"><span className="text-gray-500 w-16">상품 카테고리</span><span className="font-bold text-black text-right w-full">|  {formData.category}</span></div>
                   <div className="flex justify-between text-[10px]"><span className="text-gray-500 w-16">물건의 가격</span><span className="font-bold text-black text-right w-full">|  {formData.price}</span></div>
                   <div className="flex justify-between text-[10px]"><span className="text-gray-500 w-16">현재 내 기분</span><span className="font-bold text-black text-right w-full">|  {formData.mood}</span></div>
                 </div>
               </div>

               <hr className="border-gray-100 mb-5" />

               {/* 피드백 메시지 */}
               <div className="text-center mb-6">
                 <div className="flex justify-center mb-2">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A8B99" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                 </div>
                 <p className="text-[11px] font-bold text-black leading-snug">스트레스가 많은 하루였군요...<br/>이 소비가 지수님께 작은 위로가 되었으면 좋겠어요.</p>
               </div>

               {/* 체크리스트 */}
               <div className="space-y-3 mb-6 bg-white">
                 <div className="flex items-start gap-2.5">
                   <div className="w-[14px] h-[14px] bg-[#6A7B9B] rounded-sm flex items-center justify-center shrink-0 mt-0.5"><svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg></div>
                   <p className="text-[11px] font-bold text-black leading-tight">잔고(430,000원)대비 적절한 금액이에요</p>
                 </div>
                 <div className="flex items-start gap-2.5">
                   <div className="w-[14px] h-[14px] bg-[#6A7B9B] rounded-sm flex items-center justify-center shrink-0 mt-0.5"><svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg></div>
                   <p className="text-[11px] font-bold text-black leading-tight">이번달 이미 30,000원의 소비 유혹을 이겨냈어요</p>
                 </div>
                 <div className="flex items-start gap-2.5">
                   <div className="w-[14px] h-[14px] bg-[#6A7B9B] rounded-sm flex items-center justify-center shrink-0 mt-0.5"><svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg></div>
                   <p className="text-[11px] font-bold text-black leading-tight break-keep">지수님은 스트레스 상황에서 음식을 소비했을 때의 만족도가 높은 편이에요!</p>
                 </div>
               </div>

               {/* 점수 박스 */}
               <div className="bg-[#FAFAFA] rounded-[16px] p-5 text-center border border-gray-100 mb-6 shadow-sm">
                 <span className="text-[11px] font-bold text-black block mb-2">최종 소비 점수</span>
                 <div className="mb-3"><span className="text-[34px] font-extrabold text-black tracking-tighter">70</span><span className="text-[15px] font-bold text-black"> / 100점</span></div>
                 <p className="text-[9px] text-[#A0A0A0] leading-tight font-medium">
                   목표에 무리가 가지 않는 안전한 지출이에요 😊<br/>
                   소비를 참으면, 지수님의 목표인 '5,000,000원 저축' 목표<br/>달성률이 5% 올라가요!
                 </p>
               </div>

               {/* 하단 액션 버튼 */}
               <div className="flex gap-2">
                 <button onClick={onClose} className="flex-1 py-3.5 rounded-lg border border-gray-300 text-[11px] font-bold text-black hover:bg-gray-50 active:scale-95 transition">위시리스트에<br/>담아둘게요</button>
                 <button onClick={onClose} className="flex-1 py-3.5 rounded-lg border border-gray-300 text-[11px] font-bold text-black hover:bg-gray-50 active:scale-95 transition">확인했어요</button>
               </div>
               
               {/* 닫기 링크 */}
               <div className="text-center mt-4">
                 <button onClick={onClose} className="text-[10px] text-gray-300 hover:text-gray-500 transition">창 닫기</button>
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};