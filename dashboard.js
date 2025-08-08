// ==========================================
// FITNESS TAKVİMİ - SADELEŞTİRİLMİŞ VERSİYON
// ==========================================

// Egzersiz veritabanını exercises.json'dan yükle
let exerciseDB = {};

// Gemini API yapılandırması
const GEMINI_CONFIG = {
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    key: 'AIzaSyB1wa6-CS079N_s8kH-t7VH4nbK-ccaPzg'
};
// Mevcut kodunuzun başında, GEMINI_CONFIG'den sonra bu konfigürasyonu ekleyin:
const YOUTUBE_CONFIG = {
    enabled: true, // API key olmadığı için false
    apiKey: 'AIzaSyC5-ngZj5C5SG3FvNmEjmWORKH_Hl9LjW8\n', // Buraya gerçek API key gelecek
    searchTerms: {
        'bench press': 'bench press proper form technique',
        'squat': 'squat proper form technique',
        'deadlift': 'deadlift proper form technique',
        // Daha fazla özel terim eklenebilir
    }
};
// YouTube Video Yöneticisi
class YouTubeVideoManager {
    constructor() {
        this.cache = {};
        this.fallbackVideos = {
            // Popüler egzersizler için önceden tanımlanmış video ID'leri
            'push-up': 'IODxDxX7oi4',
            'squat': 'YaXPRqUwItQ',
            'plank': '5ER5Of4NbEg',
            'pull-up': 'eGo4IYlbE5g',
            'bench press': 'rT7DgCr-3pg',
            'deadlift': 'VWixOpqJXh0',
            'shoulder press': 'qEwKCR5JCog',
            'bicep curl': 'ykJmrZ5v0Oo',
            'tricep dips': 'yN6Q1UI_xkE',
            'lunges': 'MxfTNXSFiYI'
        };
    }

    async findExerciseVideo(exerciseName, exercise = null) {
        const cacheKey = exerciseName.toLowerCase();

        // Önbellekten kontrol et
        if (this.cache[cacheKey]) {
            return this.cache[cacheKey];
        }

        try {
            // 1. Egzersizin kendi videoKey'ini kullan
            let searchQuery = exerciseName;
            if (exercise && exercise.videoKey) {
                searchQuery = exercise.videoKey;
            }

            // 2. YouTube API ile arama yap
            if (YOUTUBE_CONFIG.enabled && YOUTUBE_CONFIG.apiKey && !YOUTUBE_CONFIG.apiKey.includes('YOUR_')) {
                const apiResult = await this.searchYouTubeAPI(searchQuery);
                if (apiResult) {
                    this.cache[cacheKey] = apiResult;
                    return apiResult;
                }
            }

            // 3. Fallback videolar
            const fallbackVideo = this.getFallbackVideo(searchQuery);
            if (fallbackVideo) {
                this.cache[cacheKey] = fallbackVideo;
                return fallbackVideo;
            }

            // 4. Genel arama URL'si oluştur
            const searchResult = this.createSearchURL(searchQuery);
            this.cache[cacheKey] = searchResult;
            return searchResult;

        } catch (error) {
            console.error('Video arama hatası:', error);
            return this.createSearchURL(exerciseName);
        }
    }

    async searchYouTubeAPI(searchQuery, exercise = null) {
        const finalQuery = this.createSearchQuery(searchQuery, exercise);

        // API key kontrolü
        if (!YOUTUBE_CONFIG || !YOUTUBE_CONFIG.apiKey || YOUTUBE_CONFIG.apiKey.includes('YOUR_')) {
            throw new Error('YouTube API key not configured');
        }

        const url = `https://www.googleapis.com/youtube/v3/search?` +
            `part=snippet&maxResults=3&q=${encodeURIComponent(finalQuery)}&` +
            `type=video&videoDuration=medium&videoDefinition=high&` +
            `relevanceLanguage=en&safeSearch=strict&key=${YOUTUBE_CONFIG.apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('API yanıt hatası');

            const data = await response.json();
            if (data.items && data.items.length > 0) {
                // En iyi videoyu seç (görüntülenme ve kalite bazında)
                const bestVideo = data.items[0];
                return {
                    videoId: bestVideo.id.videoId,
                    title: bestVideo.snippet.title,
                    thumbnail: bestVideo.snippet.thumbnails.medium.url,
                    channelTitle: bestVideo.snippet.channelTitle,
                    embedUrl: `https://www.youtube.com/embed/${bestVideo.id.videoId}`,
                    watchUrl: `https://www.youtube.com/watch?v=${bestVideo.id.videoId}`,
                    source: 'api'
                };
            }
        } catch (error) {
            console.warn('YouTube API hatası:', error);
            return null;
        }
        return null;
    }

    getFallbackVideo(exerciseName) {
        const searchTerm = exerciseName.toLowerCase();

        // Tam eşleşme ara
        if (this.fallbackVideos[searchTerm]) {
            return this.createVideoObject(this.fallbackVideos[searchTerm], exerciseName, 'fallback');
        }

        // Kısmi eşleşme ara
        for (const [key, videoId] of Object.entries(this.fallbackVideos)) {
            if (searchTerm.includes(key) || key.includes(searchTerm)) {
                return this.createVideoObject(videoId, exerciseName, 'fallback');
            }
        }

        return null;
    }

    createVideoObject(videoId, title, source = 'fallback') {
        return {
            videoId: videoId,
            title: `${title} - Exercise Tutorial`,
            thumbnail: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
            embedUrl: `https://www.youtube.com/embed/${videoId}`,
            watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
            source: source
        };
    }

    createSearchQuery(exerciseName, exercise = null) {
        // Egzersizin kendi videoKey'ini kullan
        let cleanName = exerciseName.toLowerCase();
        if (exercise && exercise.videoKey) {
            cleanName = exercise.videoKey.toLowerCase();
        }

        cleanName = cleanName
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        // Özel arama terimleri varsa kullan
        if (YOUTUBE_CONFIG && YOUTUBE_CONFIG.searchTerms && YOUTUBE_CONFIG.searchTerms[cleanName]) {
            return YOUTUBE_CONFIG.searchTerms[cleanName];
        }

        // Genel format
        return `${cleanName} exercise form technique tutorial proper`;
    }

    createSearchURL(exerciseName, exercise = null) {
        const searchQuery = this.createSearchQuery(exerciseName, exercise);
        return {
            videoId: null,
            title: `${exerciseName} - Video Arama`,
            searchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`,
            watchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`,
            source: 'search'
        };
    }
}

// Global YouTube manager
let youtubeManager = null;
let currentUser = null;
let selectedDay = null;
let currentProgram = [];
let currentExerciseContext = null;
let aiSuggestions = [];
let selectedSuggestions = [];
let aiProvider = null;

// AI Sağlayıcı Sınıfı
class AIProvider {
    constructor() {
        this.lastUsedProvider = 'Simülasyon';
    }

    async generateResponse(userInput, exercise, userProfile) {
        // Önce Gemini'yi dene
        try {
            if (GEMINI_CONFIG.key && !GEMINI_CONFIG.key.includes('your-') && !GEMINI_CONFIG.key.includes('YOUR_')) {
                const response = await this.callGemini(userInput, exercise, userProfile);
                if (response) {
                    this.lastUsedProvider = 'Gemini';
                    return response;
                }
            }
        } catch (error) {
            console.warn('Gemini hatası:', error.message);
        }

        // Fallback simülasyon
        this.lastUsedProvider = 'Simülasyon';
        return this.fallbackResponse(userInput, exercise, userProfile);
    }

    async callGemini(userInput, exercise, userProfile) {
        const prompt = `Sen deneyimli bir fitness koçusun. Kullanıcı profili: Tecrübe: ${userProfile?.tecrube || 'orta'}, Kilo: ${userProfile?.kilo || 70}kg, Boy: ${userProfile?.boy || 170}cm. 

Mevcut egzersiz: ${exercise.isim}, Zorluk: ${exercise.zorluk}/5, Set: ${exercise.set}.

Kullanıcının sorusuna kısa, net bir şekilde cevap ver. Eğer uygunsa, alternatif egzersizler de öner. 

Mevcut kas grubu egzersizleri: ${this.getExercisesByMuscleGroup(exercise.kasGrubu).map(e => e.isim).join(', ')}`;

        console.log('🔄 Gemini API çağrısı yapılıyor...');

        const response = await fetch(`${GEMINI_CONFIG.endpoint}?key=${GEMINI_CONFIG.key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `${prompt}\n\nKullanıcı: ${userInput}` }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ Gemini hatası: ${response.status} - ${errorText}`);
            throw new Error(`Gemini error: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            console.error('❌ Gemini boş yanıt', data);
            throw new Error('Gemini yanıt vermedi');
        }

        console.log('✅ Gemini başarılı');

        return {
            response: text,
            suggestions: this.extractSuggestions(text, exercise)
        };
    }

    getExercisesByMuscleGroup(kasGrubu) {
        return exerciseDB[kasGrubu] || [];
    }

    extractSuggestions(text, currentExercise) {
        const suggestions = [];
        const exerciseNames = Object.values(exerciseDB).flat().map(e => e.isim.toLowerCase());

        // Metin içinde egzersiz isimleri ara
        exerciseNames.forEach(name => {
            if (text.toLowerCase().includes(name)) {
                const exercise = Object.values(exerciseDB).flat().find(e => e.isim.toLowerCase() === name);
                if (exercise && !suggestions.some(s => s.id === exercise.id)) {
                    suggestions.push({
                        ...exercise,
                        reason: 'AI tarafından önerilen alternatif'
                    });
                }
            }
        });

        // Eğer metin içinde egzersiz bulunamazsa, mevcut egzersizle aynı kas grubundan alternatifler öner
        if (suggestions.length === 0 && currentExercise?.kasGrubu) {
            const kasGrubu = currentExercise.kasGrubu;

            if (kasGrubu && exerciseDB[kasGrubu]) {
                let filteredExercises = exerciseDB[kasGrubu].filter(e => e.id !== currentExercise.id);

                // Rastgele 3 tane seç
                shuffleArray(filteredExercises);
                suggestions.push(...filteredExercises.slice(0, 3).map(e => ({
                    ...e,
                    reason: 'Aynı kas grubu alternatifi'
                })));
            }
        }

        return suggestions.slice(0, 3);
    }

    fallbackResponse(userInput, exercise, userProfile) {
        const input = userInput.toLowerCase();
        let response = '';
        let suggestions = [];

        if (input.includes('ağrı') || input.includes('acı')) {
            response = `🚨 Ağrı durumu - ${exercise.isim} Ağrı hissediyorsanız egzersizi durdurun, ağırlığı azaltın ve gerekirse doktora başvurun.`;
            suggestions = this.getSafeAlternatives(exercise);
        } else if (input.includes('kolay')) {
            response = `🚀 Harika ilerleme - ${exercise.isim} Egzersiz kolay geliyorsa ağırlığı artırabilir veya daha zorlu varyasyonları deneyebilirsiniz.`;
            suggestions = this.getHarderAlternatives(exercise);
        } else if (input.includes('zor')) {
            response = `💪 Zorlanıyorsunuz - ${exercise.isim} Bu normal! Ağırlığı azaltın, form odaklı çalışın ve sabırlı olun.`;
            suggestions = this.getEasierAlternatives(exercise);
        } else {
            response = `🤖 ${exercise.isim} Zorluk: ${'⭐'.repeat(exercise.zorluk)} Set: ${exercise.set} Doğru form en önemlidir, kontrollü hareket yapın.`;
            suggestions = this.getGeneralAlternatives(exercise);
        }

        return { response, suggestions };
    }

    getSafeAlternatives(exercise) {
        const kasGrubu = exercise.kasGrubu;
        if (!kasGrubu) return [];

        return exerciseDB[kasGrubu]
            .filter(e => e.zorluk <= 2 && e.id !== exercise.id)
            .slice(0, 3)
            .map(e => ({
                ...e,
                reason: 'Güvenli ve düşük yoğunluk'
            }));
    }

    getHarderAlternatives(exercise) {
        const kasGrubu = exercise.kasGrubu;
        if (!kasGrubu) return [];

        return exerciseDB[kasGrubu]
            .filter(e => e.zorluk > exercise.zorluk)
            .slice(0, 3)
            .map(e => ({
                ...e,
                reason: `Zorluk seviyesi: ${e.zorluk}/5`
            }));
    }

    getEasierAlternatives(exercise) {
        const kasGrubu = exercise.kasGrubu;
        if (!kasGrubu) return [];

        return exerciseDB[kasGrubu]
            .filter(e => e.zorluk < exercise.zorluk)
            .slice(0, 3)
            .map(e => ({
                ...e,
                reason: `Başlangıç seviyesi: ${e.zorluk}/5`
            }));
    }

    getGeneralAlternatives(exercise) {
        const kasGrubu = exercise.kasGrubu;
        if (!kasGrubu) return [];

        return exerciseDB[kasGrubu]
            .filter(e => e.id !== exercise.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(e => ({
                ...e,
                reason: 'Çeşitlilik için alternatif'
            }));
    }
}

// Egzersiz veritabanını yükle
async function loadExerciseDatabase() {
    try {
        // exercises.json dosyasını yükle
        const response = await fetch('exercises.json');
        if (!response.ok) {
            throw new Error('JSON dosyası yüklenemedi');
        }
        exerciseDB = await response.json();
        console.log('✅ Egzersiz veritabanı yüklendi');
    } catch (error) {
        console.warn('⚠️ JSON yüklenemedi, varsayılan veri kullanılıyor');
        // Varsayılan egzersiz veritabanı
        exerciseDB = {
            gogus: [
                { id: 1, isim: "Barbell Bench Press", zorluk: 3, set: "4x8-10", ekipman: "Barbell + Bench" },
                { id: 2, isim: "Dumbbell Press", zorluk: 2, set: "3x10-12", ekipman: "Dumbbell + Bench" },
                { id: 3, isim: "Push-up", zorluk: 1, set: "3x15-20", ekipman: "Vücut Ağırlığı" },
                { id: 4, isim: "Cable Fly", zorluk: 2, set: "3x12-15", ekipman: "Cable Makinesi" },
                { id: 5, isim: "Incline Dumbbell Press", zorluk: 2, set: "3x10-12", ekipman: "Dumbbell + İncline Bench" }
            ],
            sirt: [
                { id: 6, isim: "Pull-up", zorluk: 3, set: "4x6-8", ekipman: "Pull-up Bar" },
                { id: 7, isim: "Lat Pulldown", zorluk: 2, set: "3x10-12", ekipman: "Lat Pulldown Makinesi" },
                { id: 8, isim: "Barbell Row", zorluk: 3, set: "4x8-10", ekipman: "Barbell" },
                { id: 9, isim: "Cable Row", zorluk: 2, set: "3x12-15", ekipman: "Cable Makinesi" },
                { id: 10, isim: "T-Bar Row", zorluk: 2, set: "3x10-12", ekipman: "T-Bar/Barbell" }
            ],
            omuz: [
                { id: 11, isim: "Military Press", zorluk: 3, set: "4x8-10", ekipman: "Barbell" },
                { id: 12, isim: "Dumbbell Shoulder Press", zorluk: 2, set: "3x10-12", ekipman: "Dumbbell" },
                { id: 13, isim: "Lateral Raise", zorluk: 1, set: "3x12-15", ekipman: "Dumbbell" },
                { id: 14, isim: "Front Raise", zorluk: 1, set: "3x12-15", ekipman: "Dumbbell" },
                { id: 15, isim: "Face Pull", zorluk: 2, set: "3x15-20", ekipman: "Cable/Direnç Bandı" }
            ],
            kol: [
                { id: 16, isim: "Barbell Curl", zorluk: 2, set: "3x10-12", ekipman: "Barbell" },
                { id: 17, isim: "Hammer Curl", zorluk: 1, set: "3x12-15", ekipman: "Dumbbell" },
                { id: 18, isim: "Tricep Dips", zorluk: 3, set: "3x8-10", ekipman: "Paralel Bar/Sandalye" },
                { id: 19, isim: "Cable Tricep Extension", zorluk: 2, set: "3x12-15", ekipman: "Cable Makinesi" },
                { id: 20, isim: "Preacher Curl", zorluk: 2, set: "3x10-12", ekipman: "Preacher Bench + Barbell" }
            ],
            bacak: [
                { id: 21, isim: "Squat", zorluk: 3, set: "4x8-10", ekipman: "Barbell + Squat Rack" },
                { id: 22, isim: "Leg Press", zorluk: 2, set: "3x10-12", ekipman: "Leg Press Makinesi" },
                { id: 23, isim: "Leg Extension", zorluk: 1, set: "3x12-15", ekipman: "Leg Extension Makinesi" },
                { id: 24, isim: "Romanian Deadlift", zorluk: 3, set: "4x8-10", ekipman: "Barbell/Dumbbell" },
                { id: 25, isim: "Leg Curl", zorluk: 1, set: "3x12-15", ekipman: "Leg Curl Makinesi" }
            ],
            core: [
                { id: 26, isim: "Plank", zorluk: 1, set: "3x60sn", ekipman: "Vücut Ağırlığı" },
                { id: 27, isim: "Crunch", zorluk: 1, set: "3x20-25", ekipman: "Vücut Ağırlığı" },
                { id: 28, isim: "Russian Twist", zorluk: 2, set: "3x15-20", ekipman: "Vücut Ağırlığı" },
                { id: 29, isim: "Leg Raise", zorluk: 2, set: "3x10-15", ekipman: "Vücut Ağırlığı" },
                { id: 30, isim: "Cable Crunch", zorluk: 2, set: "3x15-20", ekipman: "Cable Makinesi" }
            ]
        };
    }
}

// Ana başlatma fonksiyonu
window.onload = async function() {
    await loadExerciseDatabase();

    checkAuth();
    loadUserData();
    displayWeekView();
    displayCurrentWeek();
    initializeEventListeners();

    aiProvider = new AIProvider();
    youtubeManager = new YouTubeVideoManager(); // YouTube manager'ı başlat

    setTimeout(() => {
        addQuickResponseButtons();
        optimizeMobileUI();
    }, 1000);
};

// Kimlik doğrulama
function checkAuth() {
    const username = localStorage.getItem('currentUser');
    if (!username) {
        window.location.href = 'index.html';
        return;
    }
}

// Kullanıcı verilerini yükle
function loadUserData() {
    const username = localStorage.getItem('currentUser');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    currentUser = users.find(u => u.username === username);

    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('welcomeUser').textContent = `Hoş geldin, ${username}!`;
    document.getElementById('username').textContent = username;
    document.getElementById('userKilo').textContent = currentUser.profile.kilo || '--';
    document.getElementById('userBoy').textContent = currentUser.profile.boy || '--';
    document.getElementById('userTecrube').textContent = currentUser.profile.tecrube || '--';
    document.getElementById('userGunSayisi').textContent = currentUser.profile.sporGunleri?.length || 0;
    document.getElementById('userAvatar').textContent = username.charAt(0).toUpperCase();

    if (!currentUser.takvim || currentUser.takvim.length === 0) {
        generateNewProgram();
    } else {
        currentProgram = currentUser.takvim;
    }
}

// Haftalık görünüm
function displayWeekView() {
    const weekView = document.getElementById('weekView');
    const gunler = ['pazartesi', 'sali', 'carsamba', 'persembe', 'cuma', 'cumartesi', 'pazar'];
    const gunIsimleri = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

    weekView.innerHTML = '';

    const today = new Date();
    const todayDayIndex = (today.getDay() + 6) % 7;

    gunler.forEach((gun, index) => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';

        if (index === todayDayIndex) {
            dayCard.classList.add('today');
        }

        const isWorkoutDay = currentUser.profile.sporGunleri && currentUser.profile.sporGunleri.includes(gun);
        if (!isWorkoutDay) {
            dayCard.classList.add('rest-day');
            dayCard.onclick = () => showToast('Bu bir dinlenme günü');
        } else {
            dayCard.onclick = () => selectDay(gun);
        }

        const dayProgram = currentProgram.find(p => p.gun === gun);

        dayCard.innerHTML = `
            <div class="day-name">${gunIsimleri[index]}</div>
            ${isWorkoutDay ?
            (dayProgram ?
                `<div class="workout-type">${dayProgram.tip}</div>
                 <div class="exercise-count">${dayProgram.egzersizler.length} egzersiz</div>` :
                '<div class="exercise-count">Program bekleniyor</div>') :
            '<div class="exercise-count">Dinlenme</div>'}
        `;

        weekView.appendChild(dayCard);
    });
}

// Mevcut hafta
function displayCurrentWeek() {
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 7));

    const options = { day: 'numeric', month: 'long' };
    document.getElementById('currentWeek').textContent =
        `${firstDay.toLocaleDateString('tr-TR', options)} - ${lastDay.toLocaleDateString('tr-TR', options)}`;
}

// Gün seçimi
function selectDay(gun) {
    if (!currentUser.profile.sporGunleri.includes(gun)) return;

    selectedDay = gun;
    document.querySelectorAll('.day-card').forEach((card, index) => {
        const gunler = ['pazartesi', 'sali', 'carsamba', 'persembe', 'cuma', 'cumartesi', 'pazar'];
        if (gunler[index] === gun) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    showBottomSheet(gun);
}

// Bottom sheet göster
function showBottomSheet(gun) {
    const bottomSheet = document.getElementById('bottomSheet');
    const backdrop = document.getElementById('backdrop');
    const title = document.getElementById('bottomSheetTitle');
    const content = document.getElementById('exerciseContent');

    const dayProgram = currentProgram.find(p => p.gun === gun);

    title.textContent = `${gun.charAt(0).toUpperCase() + gun.slice(1)} Antrenmanı`;

    if (!dayProgram) {
        content.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <p>Bu gün için program oluşturulmamış</p>
            </div>
        `;
    } else {
        const warmupExercises = generateWarmup(dayProgram.tip);

        content.innerHTML = `
            <div class="workout-header">
                <h4>${dayProgram.tip}</h4>
                <p>${dayProgram.egzersizler.length} egzersiz</p>
            </div>
            
            <div class="warmup-section">
                <h4 class="warmup-title">🔥 Isınma Hareketleri</h4>
                <ul class="warmup-list">
                    ${warmupExercises.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            </div>
            
            <div class="exercise-list">
                ${dayProgram.egzersizler.map(egz => `
                    <div class="exercise-item">
                        <div class="exercise-info">
                            <div class="exercise-name">${egz.isim}</div>
                            <div class="exercise-sets">${egz.set}</div>
                        </div>
                        <div class="exercise-actions">
                            <button class="video-btn" onclick="showExerciseVideo(${egz.id}, '${egz.isim}')" title="Video İzle">
                                <span class="video-icon">🎥</span>
                                Video
                            </button>
                            <button class="difficulty-btn" onclick="reportDifficult(${egz.id}, '${gun}')">
                                <span class="chat-icon">💬</span>
                                AI Koç
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    backdrop.classList.add('show');
    bottomSheet.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Isınma hareketleri oluştur
function generateWarmup(workoutType) {
    const generalWarmup = [
        "5-10 dakika hafif kardiyo",
        "Dinamik esneme hareketleri"
    ];

    const specificWarmup = {
        'Full Body': ["Bodyweight squat 2x15", "Push-up 2x10", "Plank 30sn"],
        'Üst Vücut': ["Band pull-apart 2x15", "Arm circles 1dk", "Light press 2x12"],
        'Alt Vücut': ["Bodyweight lunge 2x10", "Leg swings 1dk", "Calf raise 2x15"],
        'Göğüs': ["Wall push-up 2x15", "Chest stretch 30sn", "Light fly 2x12"],
        'Sırt': ["Band lat stretch 30sn", "Cat-camel 10 tekrar", "Pull-apart 2x15"],
        'Omuz': ["Arm circles 1dk", "Shoulder dislocates 10", "Light press 2x12"],
        'Bacak': ["Bodyweight squat 2x15", "Leg swings 10/side", "Calf raise 2x15"],
        'Kol': ["Wrist circles 30sn", "Light curl 2x12", "Light extension 2x12"],
        'Core': ["Cat-camel 10", "Dead bug 2x10/side", "Plank 30sn"]
    };

    return [...generalWarmup, ...(specificWarmup[workoutType] || ["Hafif tekrar setleri"])];
}

// Bottom sheet kapat
function closeBottomSheet() {
    const bottomSheet = document.getElementById('bottomSheet');
    const backdrop = document.getElementById('backdrop');

    backdrop.classList.remove('show');
    bottomSheet.classList.remove('show');
    document.body.style.overflow = '';

    document.querySelectorAll('.day-card').forEach(card => {
        card.classList.remove('active');
    });
}

// Toast mesajı
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Program oluşturma
function generateNewProgram() {
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.disabled = true;
        generateBtn.innerHTML = '⏳ Program Oluşturuluyor...';
    }

    setTimeout(() => {
        createProgram();
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '🔄 Yeni Program Oluştur';
        }
    }, 1000);
}

// Program oluşturma
function createProgram() {
    try {
        const { sporGunleri, tecrube } = currentUser.profile;
        currentProgram = [];

        const maxZorluk = tecrube === 'baslangic' ? 2 : tecrube === 'orta' ? 3 : 4;

        if (!sporGunleri || sporGunleri.length === 0) {
            showToast('Lütfen antrenman günlerini ayarlayın');
            return;
        }

        if (sporGunleri.length <= 3) {
            // Full-body program
            sporGunleri.forEach(gun => {
                const egzersizler = [];

                ['gogus', 'sirt', 'omuz', 'bacak'].forEach(kasGrubu => {
                    const uygunEgzersizler = exerciseDB[kasGrubu].filter(e => e.zorluk <= maxZorluk);
                    shuffleArray(uygunEgzersizler);
                    egzersizler.push(uygunEgzersizler[0]);
                    if (Math.random() > 0.5 && uygunEgzersizler.length > 1) {
                        egzersizler.push(uygunEgzersizler[1]);
                    }
                });

                const coreEgzersizi = exerciseDB.core[Math.floor(Math.random() * 2)];
                egzersizler.push(coreEgzersizi);

                currentProgram.push({
                    gun: gun,
                    tip: 'Full Body',
                    egzersizler: egzersizler
                });
            });
        } else if (sporGunleri.length === 4) {
            // Upper/Lower split
            const upperDays = [sporGunleri[0], sporGunleri[2]];
            const lowerDays = [sporGunleri[1], sporGunleri[3]];

            upperDays.forEach(gun => {
                const egzersizler = [];
                ['gogus', 'sirt', 'omuz', 'kol'].forEach(kasGrubu => {
                    const uygunEgzersizler = exerciseDB[kasGrubu].filter(e => e.zorluk <= maxZorluk);
                    shuffleArray(uygunEgzersizler);
                    egzersizler.push(uygunEgzersizler[0]);
                });

                currentProgram.push({
                    gun: gun,
                    tip: 'Üst Vücut',
                    egzersizler: egzersizler
                });
            });

            lowerDays.forEach(gun => {
                const egzersizler = [];
                const bacakEgzersizleri = exerciseDB.bacak.filter(e => e.zorluk <= maxZorluk);
                shuffleArray(bacakEgzersizleri);

                for (let i = 0; i < 3; i++) {
                    if (bacakEgzersizleri[i]) {
                        egzersizler.push(bacakEgzersizleri[i]);
                    }
                }

                shuffleArray(exerciseDB.core);
                egzersizler.push(exerciseDB.core[0]);
                egzersizler.push(exerciseDB.core[1]);

                currentProgram.push({
                    gun: gun,
                    tip: 'Alt Vücut',
                    egzersizler: egzersizler
                });
            });
        } else {
            // 5+ gün - Kas grubu split
            const kasGruplari = ['gogus', 'sirt', 'omuz', 'bacak', 'kol'];
            sporGunleri.forEach((gun, index) => {
                const kasGrubu = kasGruplari[index % kasGruplari.length];
                const egzersizler = [];

                const uygunEgzersizler = exerciseDB[kasGrubu].filter(e => e.zorluk <= maxZorluk);
                shuffleArray(uygunEgzersizler);

                for (let i = 0; i < Math.min(4, uygunEgzersizler.length); i++) {
                    egzersizler.push(uygunEgzersizler[i]);
                }

                if (Math.random() > 0.5) {
                    const coreEgzersiz = exerciseDB.core[Math.floor(Math.random() * exerciseDB.core.length)];
                    egzersizler.push(coreEgzersiz);
                }

                currentProgram.push({
                    gun: gun,
                    tip: kasGrubu.charAt(0).toUpperCase() + kasGrubu.slice(1),
                    egzersizler: egzersizler
                });
            });
        }

        saveProgram();
        displayWeekView();
        showToast('🎉 Yeni program başarıyla oluşturuldu!');
    } catch (error) {
        console.error('Program oluşturma hatası:', error);
        showToast('❌ Program oluşturulurken hata oluştu');
    }
}

// Array karıştırma
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Video gösterme fonksiyonları
async function showExerciseVideo(exerciseId, exerciseName) {
    const videoModal = document.getElementById('videoModal');
    const videoTitle = document.getElementById('videoTitle');
    const videoContent = document.getElementById('videoContent');
    const loadingSpinner = document.getElementById('videoLoading');

    // Modal'ı aç ve loading göster
    videoModal.classList.add('show');
    videoTitle.textContent = `${exerciseName} - Video`;
    videoContent.style.display = 'none';
    loadingSpinner.style.display = 'block';

    try {
        // Egzersiz objesini bul (videoKey için)
        const exercise = findExerciseById(exerciseId);

        // Video bul
        const videoData = await youtubeManager.findExerciseVideo(exerciseName, exercise);

        loadingSpinner.style.display = 'none';
        videoContent.style.display = 'block';

        if (videoData.videoId && videoData.embedUrl) {
            // YouTube embed player
            videoContent.innerHTML = `
                <div class="video-player">
                    <iframe 
                        width="100%" 
                        height="280" 
                        src="${videoData.embedUrl}?autoplay=0&rel=0&modestbranding=1"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="video-info">
                    <h4>${videoData.title}</h4>
                    ${videoData.channelTitle ? `<p class="channel">Kanal: ${videoData.channelTitle}</p>` : ''}
                    <div class="video-actions">
                        <a href="${videoData.watchUrl}" target="_blank" class="watch-youtube-btn">
                            🎬 YouTube'da İzle
                        </a>
                        <button class="find-more-btn" onclick="findMoreVideos('${exerciseName}', ${exerciseId})">
                            🔍 Daha Fazla Video
                        </button>
                    </div>
                </div>
            `;
        } else if (videoData.searchUrl) {
            // Arama sonucu
            videoContent.innerHTML = `
                <div class="no-video-found">
                    <div class="no-video-icon">🎥</div>
                    <h4>Video Bulunamadı</h4>
                    <p>${exerciseName} için doğrudan video bulamadım</p>
                    <div class="video-actions">
                        <a href="${videoData.searchUrl}" target="_blank" class="search-youtube-btn">
                            🔍 YouTube'da Ara
                        </a>
                        <button class="ai-help-btn" onclick="askAIForVideo('${exerciseName}', ${exerciseId})">
                            🤖 AI'dan Yardım Al
                        </button>
                    </div>
                </div>
            `;
        }

        // Modal açıldıktan sonra scroll'u engelle
        document.body.style.overflow = 'hidden';

    } catch (error) {
        loadingSpinner.style.display = 'none';
        videoContent.style.display = 'block';
        videoContent.innerHTML = `
            <div class="video-error">
                <div class="error-icon">⚠️</div>
                <h4>Video Yüklenemedi</h4>
                <p>Bağlantı sorunu yaşanıyor</p>
                <button onclick="retryVideoSearch('${exerciseName}', ${exerciseId})" class="retry-btn">
                    🔄 Tekrar Dene
                </button>
            </div>
        `;
        console.error('Video yükleme hatası:', error);
    }
}

function closeVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const videoContent = document.getElementById('videoContent');

    videoModal.classList.remove('show');
    document.body.style.overflow = '';

    // Video iframe'ini temizle (otomatik oynatmayı durdur)
    setTimeout(() => {
        videoContent.innerHTML = '';
    }, 300);
}

async function findMoreVideos(exerciseName, exerciseId = null) {
    let searchQuery = `${exerciseName} exercise tutorial form technique`;

    // Egzersiz ID'si varsa, videoKey'i kullan
    if (exerciseId) {
        const exercise = findExerciseById(exerciseId);
        if (exercise && exercise.videoKey) {
            searchQuery = `${exercise.videoKey} exercise tutorial form technique`;
        }
    }

    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
    window.open(youtubeSearchUrl, '_blank');
}

async function askAIForVideo(exerciseName, exerciseId = null) {
    // Video bulunamadığında AI chat'i aç ve otomatik soru sor
    closeVideoModal();

    setTimeout(() => {
        let exercise = null;
        if (exerciseId) {
            exercise = findExerciseById(exerciseId);
        } else {
            exercise = findExerciseByName(exerciseName);
        }

        if (exercise) {
            currentExerciseContext = {
                exerciseId: exercise.id,
                gun: selectedDay,
                exercise: exercise
            };
            openChatModal();

            // Otomatik soru gönder
            setTimeout(() => {
                const chatInput = document.getElementById('chatInput');
                chatInput.value = `${exerciseName} hareketini nasıl yapacağımı anlat ve hangi videolara bakabilirim?`;
                sendChatMessage();
            }, 500);
        }
    }, 300);
}

async function retryVideoSearch(exerciseName, exerciseId = null) {
    // Cache'i temizle ve tekrar ara
    const cacheKey = exerciseName.toLowerCase();
    delete youtubeManager.cache[cacheKey];

    if (exerciseId) {
        showExerciseVideo(exerciseId, exerciseName);
    } else {
        const exercise = findExerciseByName(exerciseName);
        if (exercise) {
            showExerciseVideo(exercise.id, exerciseName);
        }
    }
}

function findExerciseByName(name) {
    for (const [grup, exercises] of Object.entries(exerciseDB)) {
        const found = exercises.find(e => e.isim === name);
        if (found) return { ...found, kasGrubu: grup };
    }
    return null;
}
function reportDifficult(exerciseId, gun) {
    currentExerciseContext = {
        exerciseId: exerciseId,
        gun: gun,
        exercise: findExerciseById(exerciseId)
    };
    openChatModal();
}

function findExerciseById(id) {
    for (const [grup, exercises] of Object.entries(exerciseDB)) {
        const found = exercises.find(e => e.id === id);
        if (found) return { ...found, kasGrubu: grup };
    }
    return null;
}

function openChatModal() {
    const modal = document.getElementById('aiChatModal');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');

    chatMessages.innerHTML = '';
    chatInput.value = '';

    addChatMessage('ai', `Merhaba! ${currentExerciseContext.exercise.isim} egzersizi ile ilgili nasıl yardımcı olabilirim?`, 'AI Koç');

    modal.classList.add('show');
    chatInput.focus();
}

function closeChatModal() {
    document.getElementById('aiChatModal').classList.remove('show');
}

function addChatMessage(sender, message, apiProvider = null) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;

    const time = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    const formattedMessage = message.replace(/\n/g, ' ');

    const aiBadgeText = sender === 'ai' ?
        (apiProvider ? `🤖 ${apiProvider}` : '🤖 AI Koç') : '';

    messageDiv.innerHTML = `
        ${sender === 'ai' ? `<div class="ai-badge">${aiBadgeText}</div>` : ''}
        <div class="message-bubble">${formattedMessage}</div>
        <div class="message-time">${time}</div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendChatMessage();
    }
}

async function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();

    if (!message) return;

    addChatMessage('user', message);
    chatInput.value = '';
    chatInput.disabled = true;
    document.querySelector('.chat-send-btn').disabled = true;

    showTypingIndicator();

    try {
        const analysis = await aiProvider.generateResponse(
            message,
            currentExerciseContext.exercise,
            currentUser.profile
        );

        removeTypingIndicator();
        addChatMessage('ai', analysis.response, aiProvider.lastUsedProvider);

        if (analysis.suggestions && analysis.suggestions.length > 0) {
            aiSuggestions = analysis.suggestions;
            showSuggestions(analysis.suggestions);
        }

    } catch (error) {
        removeTypingIndicator();
        addChatMessage('ai', '❌ Bir hata oluştu. Lütfen tekrar deneyin.', 'Hata');
        console.error('Chat Error:', error);
    } finally {
        chatInput.disabled = false;
        document.querySelector('.chat-send-btn').disabled = false;
        chatInput.focus();
    }
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message ai';
    typingDiv.id = 'typingIndicator';

    typingDiv.innerHTML = `
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;

    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

function showSuggestions(suggestions) {
    const container = document.getElementById('suggestionContainer');
    if (!container) return;

    container.innerHTML = '';

    const suggestionListDiv = document.createElement('div');
    suggestionListDiv.className = 'suggestion-grid';

    suggestionListDiv.innerHTML = suggestions.map((sug, index) => `
        <div class="suggestion-card" onclick="selectSuggestion(${index})">
            <div class="suggestion-header">
                <div class="suggestion-exercise">${sug.isim}</div>
                <div class="suggestion-difficulty">${'⭐'.repeat(sug.zorluk)}</div>
            </div>
            <div class="suggestion-body">
                <div class="suggestion-sets">${sug.set}</div>
                <div class="suggestion-equipment">${sug.ekipman || 'Vücut Ağırlığı'}</div>
                <div class="suggestion-reason">${sug.reason || 'AI Önerisi'}</div>
            </div>
            <div class="suggestion-footer">
                <button class="video-btn-small" onclick="event.stopPropagation(); showExerciseVideo(${sug.id}, '${sug.isim}')">
                    🎥 Video
                </button>
                <button class="select-btn" onclick="event.stopPropagation(); selectSuggestion(${index})">
                    ${selectedSuggestions.includes(sug) ? '✓ Seçildi' : 'Seç'}
                </button>
            </div>
        </div>
    `).join('');

    const actionButtons = document.createElement('div');
    actionButtons.className = 'suggestion-actions';

    actionButtons.innerHTML = `
        <button class="cancel-btn" onclick="closeSuggestions()">
            İptal
        </button>
        <button class="apply-btn" onclick="applySuggestions()" ${selectedSuggestions.length === 0 ? 'disabled' : ''}>
            Uygula (${selectedSuggestions.length})
        </button>
    `;

    container.appendChild(suggestionListDiv);
    container.appendChild(actionButtons);
    container.style.display = 'block';
}

function selectSuggestion(index) {
    const suggestion = aiSuggestions[index];
    const isSelected = selectedSuggestions.some(s => s.id === suggestion.id);

    if (isSelected) {
        selectedSuggestions = selectedSuggestions.filter(s => s.id !== suggestion.id);
    } else {
        selectedSuggestions = [...selectedSuggestions, suggestion];
    }

    // UI'ı güncelle
    const cards = document.querySelectorAll('.suggestion-card');
    cards.forEach((card, i) => {
        if (i === index) {
            card.classList.toggle('selected', !isSelected);
        }
        const selectBtn = card.querySelector('.select-btn');
        if (selectBtn) {
            selectBtn.textContent = selectedSuggestions.some(s => s.id === aiSuggestions[i].id) ? '✓ Seçildi' : 'Seç';
        }
    });

    // Uygula butonunu güncelle
    const applyBtn = document.querySelector('.apply-btn');
    if (applyBtn) {
        applyBtn.disabled = selectedSuggestions.length === 0;
        applyBtn.textContent = `Uygula (${selectedSuggestions.length})`;
    }
}

function closeSuggestions() {
    document.getElementById('suggestionContainer').style.display = 'none';
    selectedSuggestions = [];
}

function toggleSuggestion(index) {
    const items = document.querySelectorAll('.suggestion-item');
    const item = items[index];
    const suggestion = aiSuggestions[index];

    if (item.classList.contains('selected')) {
        item.classList.remove('selected');
        selectedSuggestions = [];
    } else {
        items.forEach(otherItem => otherItem.classList.remove('selected'));
        item.classList.add('selected');
        selectedSuggestions = [suggestion];
    }

    const applyBtn = document.querySelector('.apply-suggestions-btn');
    if (applyBtn) {
        applyBtn.disabled = selectedSuggestions.length === 0;
        applyBtn.innerHTML = selectedSuggestions.length === 0 ? '✅ Öneri Seç' : '✅ Seçili Öneriyi Uygula';
    }
}

function applySuggestions() {
    if (selectedSuggestions.length === 0) {
        showToast('❌ Lütfen en az bir öneri seçin');
        return;
    }

    const { gun, exerciseId } = currentExerciseContext;
    const dayProgram = currentProgram.find(p => p.gun === gun);

    if (!dayProgram) {
        showToast('❌ Program bulunamadı');
        return;
    }

    // Eğer tek bir egzersiz için öneri seçildiyse (replace)
    if (exerciseId) {
        const exerciseIndex = dayProgram.egzersizler.findIndex(e => e.id === exerciseId);
        if (exerciseIndex === -1) {
            showToast('❌ Egzersiz bulunamadı');
            return;
        }

        // Seçilen ilk öneriyle değiştir
        dayProgram.egzersizler[exerciseIndex] = selectedSuggestions[0];
    }
    // Eğer yeni egzersiz eklemek için öneri seçildiyse (add)
    else {
        dayProgram.egzersizler.push(...selectedSuggestions);
    }

    saveProgram();
    closeChatModal();
    closeSuggestions();
    displayWeekView();

    if (selectedDay === gun) {
        showBottomSheet(gun);
    }

    showToast('✅ Program başarıyla güncellendi!');
    selectedSuggestions = [];
}

// Hızlı yanıt butonları
function addQuickResponseButtons() {
    const quickResponses = [
        "Form nasıl olmalı?",
        "Çok kolay geldi",
        "Çok zor geliyor",
        "Ağrım var",
        "Alternatif istiyorum",
        "Daha hafif olsun",
        "Daha ağır olsun",
        "Set sayısını değiştir",
        "Tekrar sayısını değiştir",
        "Ev versiyonu var mı?",
        "Ekipman gerektirmeyen",
        "Sadece vücut ağırlığı",
        "Başlangıç seviyesi",
        "İleri seviye",
        "Kas grupları",
        "Nefes tekniği",
        "Yaygın hatalar",
        "Isınma hareketleri"
    ];

    const chatContainer = document.querySelector('.chat-container');
    if (!chatContainer) return;

    const existingQuickResponse = chatContainer.querySelector('.quick-responses');
    if (existingQuickResponse) {
        existingQuickResponse.remove();
    }

    const quickResponseDiv = document.createElement('div');
    quickResponseDiv.className = 'quick-responses';
    quickResponseDiv.innerHTML = quickResponses.map(response =>
        `<button class="quick-response-btn" onclick="useQuickResponse('${response}')">${response}</button>`
    ).join('');

    const chatInputContainer = chatContainer.querySelector('.chat-input-container');
    chatContainer.insertBefore(quickResponseDiv, chatInputContainer);

    // Scroll zorla aktif et
    setTimeout(() => {
        const container = document.querySelector('.quick-responses');
        if (container) {
            container.style.overflowX = 'scroll';

            // Touch scroll
            let startX = 0;
            let scrollLeft = 0;

            container.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
            });

            container.addEventListener('touchmove', (e) => {
                if (!startX) return;
                const x = e.touches[0].pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeft - walk;
            });
        }
    }, 100);
}

function useQuickResponse(response) {
    const chatInput = document.getElementById('chatInput');
    chatInput.value = response;
    sendChatMessage();
}

// Mobil optimizasyonu
function optimizeMobileUI() {
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    window.addEventListener('resize', setViewportHeight);
    setViewportHeight();

    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('focus', () => {
            setTimeout(() => {
                chatInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    }
}

// Program kaydet
function saveProgram() {
    currentUser.takvim = currentProgram;
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.username === currentUser.username);

    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Çıkış yap
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Event listeners
function initializeEventListeners() {
    let touchStartY = 0;
    let touchEndY = 0;

    const bottomSheet = document.getElementById('bottomSheet');
    if (bottomSheet) {
        bottomSheet.addEventListener('touchstart', e => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        bottomSheet.addEventListener('touchend', e => {
            touchEndY = e.changedTouches[0].screenY;
            const deltaY = touchStartY - touchEndY;

            if (deltaY < -100) {
                closeBottomSheet();
            }
        }, { passive: true });
    }

    const aiChatModal = document.getElementById('aiChatModal');
    if (aiChatModal) {
        aiChatModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeChatModal();
            }
        });
    }

    const backdrop = document.getElementById('backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', closeBottomSheet);
    }

    // Video modal
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeVideoModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (document.getElementById('videoModal')?.classList.contains('show')) {
                closeVideoModal();
            } else if (document.getElementById('aiChatModal')?.classList.contains('show')) {
                closeChatModal();
            } else if (document.getElementById('bottomSheet')?.classList.contains('show')) {
                closeBottomSheet();
            }
        }
    });

    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const setIOSViewport = () => {
            document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        };

        window.addEventListener('resize', setIOSViewport);
        window.addEventListener('orientationchange', setIOSViewport);
        setIOSViewport();
    }
}

// ==========================================
// KOD SONU - SADELEŞTİRİLMİŞ VERSİYON
// ==========================================
