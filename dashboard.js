// ==========================================
// FITNESS TAKVİMİ - TAM VERSİYON
// ==========================================

// Egzersiz veritabanı - FULL
const exerciseDB = {
    gogus: [
        { id: 1, isim: "Barbell Bench Press", zorluk: 3, set: "4x8-10", ekipman: "Barbell + Bench" },
        { id: 2, isim: "Dumbbell Press", zorluk: 2, set: "3x10-12", ekipman: "Dumbbell + Bench" },
        { id: 3, isim: "Push-up", zorluk: 1, set: "3x15-20", ekipman: "Vücut Ağırlığı" },
        { id: 4, isim: "Cable Fly", zorluk: 2, set: "3x12-15", ekipman: "Cable Makinesi" },
        { id: 5, isim: "Incline Dumbbell Press", zorluk: 2, set: "3x10-12", ekipman: "Dumbbell + İncline Bench" },
        { id: 31, isim: "Diamond Push-up", zorluk: 3, set: "3x8-12", ekipman: "Vücut Ağırlığı" },
        { id: 32, isim: "Decline Push-up", zorluk: 2, set: "3x10-15", ekipman: "Vücut Ağırlığı + Yüksek Yüzey" },
        { id: 33, isim: "Wide Grip Push-up", zorluk: 2, set: "3x12-15", ekipman: "Vücut Ağırlığı" },
        { id: 34, isim: "Chest Dips", zorluk: 3, set: "3x8-12", ekipman: "Paralel Bar/Sandalye" },
        { id: 35, isim: "Single Arm Push-up", zorluk: 4, set: "3x5-8", ekipman: "Vücut Ağırlığı" },
        { id: 36, isim: "Archer Push-up", zorluk: 4, set: "3x6-10", ekipman: "Vücut Ağırlığı" },
        { id: 37, isim: "Hindu Push-up", zorluk: 3, set: "3x8-15", ekipman: "Vücut Ağırlığı" },
        { id: 38, isim: "Pike Push-up", zorluk: 3, set: "3x8-12", ekipman: "Vücut Ağırlığı" },
        { id: 39, isim: "Wall Push-up", zorluk: 1, set: "3x15-25", ekipman: "Duvar" },
        { id: 40, isim: "Incline Push-up", zorluk: 1, set: "3x12-20", ekipman: "Yüksek Yüzey" }
    ],
    sirt: [
        { id: 6, isim: "Pull-up", zorluk: 3, set: "4x6-8", ekipman: "Pull-up Bar" },
        { id: 7, isim: "Lat Pulldown", zorluk: 2, set: "3x10-12", ekipman: "Lat Pulldown Makinesi" },
        { id: 8, isim: "Barbell Row", zorluk: 3, set: "4x8-10", ekipman: "Barbell" },
        { id: 9, isim: "Cable Row", zorluk: 2, set: "3x12-15", ekipman: "Cable Makinesi" },
        { id: 10, isim: "T-Bar Row", zorluk: 2, set: "3x10-12", ekipman: "T-Bar/Barbell" },
        { id: 41, isim: "Chin-up", zorluk: 3, set: "3x6-10", ekipman: "Pull-up Bar" },
        { id: 42, isim: "Negative Pull-up", zorluk: 2, set: "3x5-8", ekipman: "Pull-up Bar + Yardım" },
        { id: 43, isim: "Inverted Row", zorluk: 2, set: "3x10-15", ekipman: "Düşük Bar/Masa" },
        { id: 44, isim: "Superman", zorluk: 1, set: "3x15-20", ekipman: "Vücut Ağırlığı" },
        { id: 45, isim: "Reverse Fly", zorluk: 1, set: "3x12-18", ekipman: "Vücut Ağırlığı" },
        { id: 46, isim: "Bridge Hold", zorluk: 2, set: "3x30-60sn", ekipman: "Vücut Ağırlığı" },
        { id: 47, isim: "Towel Pull-up", zorluk: 4, set: "3x5-8", ekipman: "Havlu + Bar" },
        { id: 48, isim: "Door Pull", zorluk: 1, set: "3x10-15", ekipman: "Kapı Çerçevesi" },
        { id: 49, isim: "Wall Handstand", zorluk: 3, set: "3x20-45sn", ekipman: "Duvar" },
        { id: 50, isim: "Scapula Pull-up", zorluk: 2, set: "3x8-12", ekipman: "Pull-up Bar" }
    ],
    omuz: [
        { id: 11, isim: "Military Press", zorluk: 3, set: "4x8-10", ekipman: "Barbell" },
        { id: 12, isim: "Dumbbell Shoulder Press", zorluk: 2, set: "3x10-12", ekipman: "Dumbbell" },
        { id: 13, isim: "Lateral Raise", zorluk: 1, set: "3x12-15", ekipman: "Dumbbell" },
        { id: 14, isim: "Front Raise", zorluk: 1, set: "3x12-15", ekipman: "Dumbbell" },
        { id: 15, isim: "Face Pull", zorluk: 2, set: "3x15-20", ekipman: "Cable/Direnç Bandı" },
        { id: 51, isim: "Pike Push-up", zorluk: 2, set: "3x10-15", ekipman: "Vücut Ağırlığı" },
        { id: 52, isim: "Handstand Push-up", zorluk: 4, set: "3x3-8", ekipman: "Duvar + Vücut Ağırlığı" },
        { id: 53, isim: "Wall Angels", zorluk: 1, set: "3x15-20", ekipman: "Duvar" },
        { id: 54, isim: "Arm Circles", zorluk: 1, set: "3x20 her yön", ekipman: "Vücut Ağırlığı" },
        { id: 55, isim: "Y-T-W Raises", zorluk: 1, set: "3x12-15", ekipman: "Vücut Ağırlığı" },
        { id: 56, isim: "Bottle/Water Jug Press", zorluk: 1, set: "3x12-18", ekipman: "Su Şişesi/Bidon" },
        { id: 57, isim: "Chair Dips", zorluk: 2, set: "3x10-15", ekipman: "Sandalye" },
        { id: 58, isim: "Wall Slide", zorluk: 1, set: "3x12-20", ekipman: "Duvar" },
        { id: 59, isim: "Resistance Band Press", zorluk: 2, set: "3x12-18", ekipman: "Direnç Bandı" },
        { id: 60, isim: "Doorway Stretch Hold", zorluk: 1, set: "3x30-45sn", ekipman: "Kapı Çerçevesi" }
    ],
    kol: [
        { id: 16, isim: "Barbell Curl", zorluk: 2, set: "3x10-12", ekipman: "Barbell" },
        { id: 17, isim: "Hammer Curl", zorluk: 1, set: "3x12-15", ekipman: "Dumbbell" },
        { id: 18, isim: "Tricep Dips", zorluk: 3, set: "3x8-10", ekipman: "Paralel Bar/Sandalye" },
        { id: 19, isim: "Cable Tricep Extension", zorluk: 2, set: "3x12-15", ekipman: "Cable Makinesi" },
        { id: 20, isim: "Preacher Curl", zorluk: 2, set: "3x10-12", ekipman: "Preacher Bench + Barbell" },
        { id: 61, isim: "Diamond Push-up", zorluk: 3, set: "3x8-12", ekipman: "Vücut Ağırlığı" },
        { id: 62, isim: "Close Grip Push-up", zorluk: 2, set: "3x10-15", ekipman: "Vücut Ağırlığı" },
        { id: 63, isim: "Tricep Push-up", zorluk: 2, set: "3x8-15", ekipman: "Vücut Ağırlığı" },
        { id: 64, isim: "Wall Push-up (Tricep)", zorluk: 1, set: "3x12-20", ekipman: "Duvar" },
        { id: 65, isim: "Bottle Curl", zorluk: 1, set: "3x15-25", ekipman: "Su Şişesi/Bidon" },
        { id: 66, isim: "Isometric Bicep Hold", zorluk: 2, set: "3x20-40sn", ekipman: "Vücut Ağırlığı" },
        { id: 67, isim: "Chair Tricep Dips", zorluk: 2, set: "3x10-18", ekipman: "Sandalye" },
        { id: 68, isim: "Floor Tricep Press", zorluk: 2, set: "3x12-18", ekipman: "Vücut Ağırlığı" },
        { id: 69, isim: "Resistance Band Curl", zorluk: 1, set: "3x15-25", ekipman: "Direnç Bandı" },
        { id: 70, isim: "Towel Curl", zorluk: 2, set: "3x10-15", ekipman: "Havlu + Ayak" }
    ],
    bacak: [
        { id: 21, isim: "Squat", zorluk: 3, set: "4x8-10", ekipman: "Barbell + Squat Rack" },
        { id: 22, isim: "Leg Press", zorluk: 2, set: "3x10-12", ekipman: "Leg Press Makinesi" },
        { id: 23, isim: "Leg Extension", zorluk: 1, set: "3x12-15", ekipman: "Leg Extension Makinesi" },
        { id: 24, isim: "Romanian Deadlift", zorluk: 3, set: "4x8-10", ekipman: "Barbell/Dumbbell" },
        { id: 25, isim: "Leg Curl", zorluk: 1, set: "3x12-15", ekipman: "Leg Curl Makinesi" },
        { id: 71, isim: "Bodyweight Squat", zorluk: 1, set: "3x15-25", ekipman: "Vücut Ağırlığı" },
        { id: 72, isim: "Jump Squat", zorluk: 2, set: "3x12-20", ekipman: "Vücut Ağırlığı" },
        { id: 73, isim: "Lunges", zorluk: 2, set: "3x12-18", ekipman: "Vücut Ağırlığı" },
        { id: 74, isim: "Bulgarian Split Squat", zorluk: 3, set: "3x10-15", ekipman: "Sandalye/Yüksek Yüzey" },
        { id: 75, isim: "Single Leg Squat", zorluk: 4, set: "3x5-10", ekipman: "Vücut Ağırlığı" },
        { id: 76, isim: "Wall Sit", zorluk: 2, set: "3x30-60sn", ekipman: "Duvar" },
        { id: 77, isim: "Calf Raises", zorluk: 1, set: "3x20-30", ekipman: "Vücut Ağırlığı" },
        { id: 78, isim: "Step-ups", zorluk: 2, set: "3x15-20", ekipman: "Merdiven/Kutu" },
        { id: 79, isim: "Glute Bridge", zorluk: 1, set: "3x15-25", ekipman: "Vücut Ağırlığı" },
        { id: 80, isim: "Single Leg Glute Bridge", zorluk: 2, set: "3x10-15", ekipman: "Vücut Ağırlığı" },
        { id: 81, isim: "Curtsy Lunge", zorluk: 2, set: "3x12-18", ekipman: "Vücut Ağırlığı" },
        { id: 82, isim: "Side Lunges", zorluk: 2, set: "3x12-18", ekipman: "Vücut Ağırlığı" },
        { id: 83, isim: "Sumo Squat", zorluk: 2, set: "3x15-20", ekipman: "Vücut Ağırlığı" },
        { id: 84, isim: "Duck Walk", zorluk: 3, set: "3x10-15 adım", ekipman: "Vücut Ağırlığı" }
    ],
    core: [
        { id: 26, isim: "Plank", zorluk: 1, set: "3x60sn", ekipman: "Vücut Ağırlığı" },
        { id: 27, isim: "Crunch", zorluk: 1, set: "3x20-25", ekipman: "Vücut Ağırlığı" },
        { id: 28, isim: "Russian Twist", zorluk: 2, set: "3x15-20", ekipman: "Vücut Ağırlığı" },
        { id: 29, isim: "Leg Raise", zorluk: 2, set: "3x10-15", ekipman: "Vücut Ağırlığı" },
        { id: 30, isim: "Cable Crunch", zorluk: 2, set: "3x15-20", ekipman: "Cable Makinesi" },
        { id: 85, isim: "Mountain Climbers", zorluk: 2, set: "3x20-30", ekipman: "Vücut Ağırlığı" },
        { id: 86, isim: "Bicycle Crunches", zorluk: 1, set: "3x20-30", ekipman: "Vücut Ağırlığı" },
        { id: 87, isim: "Dead Bug", zorluk: 1, set: "3x12-16", ekipman: "Vücut Ağırlığı" },
        { id: 88, isim: "Bird Dog", zorluk: 1, set: "3x12-16", ekipman: "Vücut Ağırlığı" },
        { id: 89, isim: "Side Plank", zorluk: 2, set: "3x30-45sn", ekipman: "Vücut Ağırlığı" },
        { id: 90, isim: "Hollow Body Hold", zorluk: 3, set: "3x20-40sn", ekipman: "Vücut Ağırlığı" },
        { id: 91, isim: "V-ups", zorluk: 3, set: "3x10-15", ekipman: "Vücut Ağırlığı" },
        { id: 92, isim: "Reverse Crunch", zorluk: 2, set: "3x15-20", ekipman: "Vücut Ağırlığı" },
        { id: 93, isim: "Flutter Kicks", zorluk: 2, set: "3x20-30", ekipman: "Vücut Ağırlığı" },
        { id: 94, isim: "High Knees", zorluk: 1, set: "3x30sn", ekipman: "Vücut Ağırlığı" },
        { id: 95, isim: "Burpees", zorluk: 3, set: "3x8-15", ekipman: "Vücut Ağırlığı" }
    ]
};

// AI API Sağlayıcıları
const AI_PROVIDERS = [
    {
        name: 'Gemini',
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        key: 'AIzaSyB1wa6-CS079N_s8kH-t7VH4nbK-ccaPzg',
        enabled: true // AKTIF
    }
];

// Global değişkenler
let currentUser = null;
let selectedDay = null;
let currentProgram = [];
let currentExerciseContext = null;
let aiSuggestions = [];
let selectedSuggestions = [];
let multiAI = null;

// Çoklu AI Sağlayıcısı
class MultiAIProvider {
    constructor() {
        this.providers = AI_PROVIDERS.filter(p => p.enabled);
        this.currentProviderIndex = 0;
        this.lastUsedProvider = 'Simülasyon';
    }

    async generateResponse(userInput, exercise, userProfile) {
        if (this.providers.length === 0) {
            this.lastUsedProvider = 'Simülasyon';
            return this.fallbackResponse(userInput, exercise, userProfile);
        }

        for (let i = 0; i < this.providers.length; i++) {
            const provider = this.providers[this.currentProviderIndex];
            this.currentProviderIndex = (this.currentProviderIndex + 1) % this.providers.length;

            try {
                const response = await this.callProvider(provider, userInput, exercise, userProfile);
                if (response) {
                    this.lastUsedProvider = provider.name;
                    return response;
                }
            } catch (error) {
                console.warn(`${provider.name} hatası:`, error.message);
            }
        }

        this.lastUsedProvider = 'Simülasyon';
        return this.fallbackResponse(userInput, exercise, userProfile);
    }

// BONUS: Gemini'ye daha iyi prompt gönder
    async callProvider(provider, userInput, exercise, userProfile) {
        // API key kontrolü
        if (!provider.key || provider.key.includes('your-') || provider.key.includes('YOUR_')) {
            throw new Error(`${provider.name} API key eksik`);
        }

        // Gemini için özel prompt - alternatif egzersizleri önersin
        const prompt = provider.name === 'Gemini'
            ? `Sen deneyimli bir fitness koçusun. Kullanıcı profili: Tecrübe: ${userProfile?.tecrube || 'orta'}, Kilo: ${userProfile?.kilo || 70}kg, Boy: ${userProfile?.boy || 170}cm. 

Mevcut egzersiz: ${exercise.isim}, Zorluk: ${exercise.zorluk}/5, Set: ${exercise.set}.

Kullanıcının sorusuna kısa, net bir şekilde cevap ver. Eğer uygunsa, alternatif egzersizler de öner. 

Mevcut kas grubu egzersizleri: ${this.getExercisesByMuscleGroup(exercise.kasGrubu).map(e => e.isim).join(', ')}`
            : `Sen deneyimli bir fitness koçusun. Kullanıcı profili: Tecrübe: ${userProfile?.tecrube || 'orta'}, Kilo: ${userProfile?.kilo || 70}kg, Boy: ${userProfile?.boy || 170}cm. Egzersiz: ${exercise.isim}, Zorluk: ${exercise.zorluk}/5, Set: ${exercise.set}. Kısa, net öneriler ver.`;

        console.log(`🔄 ${provider.name} API'si deneniyor...`);

        if (provider.name === 'Gemini') {
            return await this.callGemini(provider, prompt, userInput);
        } else if (provider.name === 'DeepSeek' || provider.name === 'Groq') {
            return await this.callChatAPI(provider, prompt, userInput);
        }
    }

// Yardımcı fonksiyon - kas grubuna göre egzersizleri getir
    getExercisesByMuscleGroup(kasGrubu) {
        return exerciseDB[kasGrubu] || [];
    }
    async callGemini(provider, systemPrompt, userInput) {
        console.log(`📡 Gemini API çağrısı yapılıyor...`);

        const response = await fetch(`${provider.endpoint}?key=${provider.key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `${systemPrompt}\n\nKullanıcı: ${userInput}` }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
            })
        });

        console.log(`📊 Gemini yanıt durumu: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ Gemini hatası: ${response.status} - ${errorText}`);
            throw new Error(`Gemini error: ${response.status}`);
        }

        const data = await response.json();
        console.log(`📦 Gemini yanıtı:`, data);

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            console.error(`❌ Gemini boş yanıt`, data);
            throw new Error('Gemini yanıt vermedi');
        }

        console.log(`✅ Gemini başarılı: ${text.substring(0, 50)}...`);

        // ÖNEMLİ: Gemini için de suggestions oluştur
        return {
            response: text,
            suggestions: this.extractSuggestions(text) // Bu satır EKSİKTİ!
        };
    }
    async callChatAPI(provider, systemPrompt, userInput) {
        console.log(`📡 ${provider.name} API çağrısı yapılıyor...`);

        const response = await fetch(provider.endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${provider.key}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: provider.name === 'DeepSeek' ? 'deepseek-chat' :
                    provider.name === 'Groq' ? 'llama3-8b-8192' : 'gpt-3.5-turbo',
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userInput }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        console.log(`📊 ${provider.name} yanıt durumu: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ ${provider.name} hatası: ${response.status} - ${errorText}`);
            throw new Error(`${provider.name} error: ${response.status}`);
        }

        const data = await response.json();
        console.log(`📦 ${provider.name} yanıtı:`, data);

        const text = data.choices?.[0]?.message?.content;

        if (!text) {
            console.error(`❌ ${provider.name} boş yanıt`, data);
            throw new Error(`${provider.name} yanıt vermedi`);
        }

        console.log(`✅ ${provider.name} başarılı: ${text.substring(0, 50)}...`);
        return { response: text, suggestions: this.extractSuggestions(text) };
    }

    extractSuggestions(text) {
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
        if (suggestions.length === 0 && currentExerciseContext?.exercise) {
            const currentExercise = currentExerciseContext.exercise;
            const kasGrubu = currentExercise.kasGrubu;

            if (kasGrubu && exerciseDB[kasGrubu]) {
                // Kullanıcının sorduğu soruya göre alternatif seç
                const input = text.toLowerCase();
                let filteredExercises = exerciseDB[kasGrubu].filter(e => e.id !== currentExercise.id);

                if (input.includes('kolay') || input.includes('easy')) {
                    // Daha zor egzersizler öner
                    filteredExercises = filteredExercises.filter(e => e.zorluk > currentExercise.zorluk);
                } else if (input.includes('zor') || input.includes('difficult') || input.includes('ağrı')) {
                    // Daha kolay egzersizler öner
                    filteredExercises = filteredExercises.filter(e => e.zorluk < currentExercise.zorluk);
                } else if (input.includes('alternatif') || input.includes('alternative')) {
                    // Aynı zorluk seviyesinden öner
                    filteredExercises = filteredExercises.filter(e => e.zorluk === currentExercise.zorluk);
                }

                // Rastgele 3 tane seç
                shuffleArray(filteredExercises);
                suggestions.push(...filteredExercises.slice(0, 3).map(e => ({
                    ...e,
                    reason: 'Aynı kas grubu alternatifi'
                })));
            }
        }

        return suggestions.slice(0, 3); // Max 3 öneri
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

    // Alternatif egzersiz fonksiyonları
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

// Ana başlatma fonksiyonu
window.onload = function() {
    checkAuth();
    loadUserData();
    displayWeekView();
    displayCurrentWeek();
    initializeEventListeners();

    multiAI = new MultiAIProvider();

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
                        <button class="difficulty-btn" onclick="reportDifficult(${egz.id}, '${gun}')">
                            <span class="chat-icon">💬</span>
                            AI Koç
                        </button>
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

// AI Chat
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
        const analysis = await multiAI.generateResponse(
            message,
            currentExerciseContext.exercise,
            currentUser.profile
        );

        removeTypingIndicator();
        addChatMessage('ai', analysis.response, multiAI.lastUsedProvider);

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
    suggestionListDiv.innerHTML = suggestions.map((sug, index) => `
        <div class="suggestion-item" onclick="toggleSuggestion(${index})">
            <div class="suggestion-exercise">${sug.isim}</div>
            <div class="suggestion-reason">${sug.reason || 'Alternatif öneri'}</div>
            <div class="suggestion-sets">${sug.set}</div>
        </div>
    `).join('');

    const applyBtn = document.createElement('button');
    applyBtn.className = 'apply-suggestions-btn';
    applyBtn.innerHTML = '✅ Öneri Seç';
    applyBtn.onclick = applySuggestions;
    applyBtn.disabled = true;

    container.appendChild(suggestionListDiv);
    container.appendChild(applyBtn);
    container.style.display = 'block';
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
        showToast('❌ Lütfen bir öneri seçin');
        return;
    }

    const { gun, exerciseId } = currentExerciseContext;
    const dayProgram = currentProgram.find(p => p.gun === gun);

    if (!dayProgram) {
        showToast('❌ Program bulunamadı');
        return;
    }

    const exerciseIndex = dayProgram.egzersizler.findIndex(e => e.id === exerciseId);
    if (exerciseIndex === -1) {
        showToast('❌ Egzersiz bulunamadı');
        return;
    }

    dayProgram.egzersizler[exerciseIndex] = selectedSuggestions[0];

    saveProgram();
    closeChatModal();
    displayWeekView();

    if (selectedDay === gun) {
        showBottomSheet(gun);
    }

    showToast('✅ Program başarıyla güncellendi!');
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

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (document.getElementById('aiChatModal')?.classList.contains('show')) {
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
// KOD SONU - HATASIZ VERSİYON
// ==========================================