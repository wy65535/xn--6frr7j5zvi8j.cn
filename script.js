// AI Model Price Calculator
document.addEventListener('DOMContentLoaded', function() {
    // Price data (per million tokens in CNY)
    const priceData = {
        gpt4: {
            siliconflow: 0.42,
            openai: 210,  // $30 converted to CNY
            zhipu: null,
            baidu: null,
            alibaba: null
        },
        gpt35: {
            siliconflow: 0.042,
            openai: 3.5,
            zhipu: 0.5,
            baidu: 0.8,
            alibaba: 0.6
        },
        claude: {
            siliconflow: 0.84,
            openai: null,
            zhipu: null,
            baidu: null,
            alibaba: null,
            anthropic: 210  // $30 converted
        },
        deepseek: {
            siliconflow: 0.07,
            openai: null,
            zhipu: null,
            baidu: null,
            alibaba: null,
            deepseek_official: 0.14
        }
    };

    const platformNames = {
        siliconflow: '硅基流动',
        openai: 'OpenAI官方',
        zhipu: '智谱AI',
        baidu: '百度文心',
        alibaba: '阿里通义',
        anthropic: 'Claude官方',
        deepseek_official: 'DeepSeek官方'
    };

    function calculatePrices() {
        const tokenInput = document.getElementById('token-input');
        const modelSelect = document.getElementById('model-select');
        const resultGrid = document.getElementById('result-grid');
        const savingsSpan = document.getElementById('savings');

        if (!tokenInput || !modelSelect || !resultGrid) return;

        const tokens = parseFloat(tokenInput.value) || 1;
        const selectedModel = modelSelect.value;
        const prices = priceData[selectedModel];

        if (!prices) return;

        // Calculate costs for each platform
        const results = [];
        for (const [platform, pricePerMillion] of Object.entries(prices)) {
            if (pricePerMillion !== null) {
                const cost = (tokens * pricePerMillion).toFixed(2);
                results.push({
                    platform: platformNames[platform] || platform,
                    cost: parseFloat(cost),
                    isBest: platform === 'siliconflow'
                });
            }
        }

        // Sort by cost
        results.sort((a, b) => a.cost - b.cost);

        // Calculate savings
        const siliconflowCost = results.find(r => r.platform === '硅基流动')?.cost || 0;
        const maxCost = Math.max(...results.map(r => r.cost));
        const savings = (maxCost - siliconflowCost).toFixed(2);

        // Update UI
        resultGrid.innerHTML = results.map(result => `
            <div class="result-item ${result.isBest ? 'best' : ''}">
                <span class="result-platform">
                    ${result.platform}
                    ${result.isBest ? '<span style="margin-left: 8px; color: #10B981; font-size: 0.9rem;">✓ 最便宜</span>' : ''}
                </span>
                <span class="result-price">¥${result.cost}</span>
            </div>
        `).join('');

        savingsSpan.textContent = savings;
    }

    // Event listeners
    const tokenInput = document.getElementById('token-input');
    const modelSelect = document.getElementById('model-select');

    if (tokenInput) {
        tokenInput.addEventListener('input', calculatePrices);
    }

    if (modelSelect) {
        modelSelect.addEventListener('change', calculatePrices);
    }

    // Initial calculation
    calculatePrices();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle (if needed in future)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
});

// FAQ Toggle functionality for FAQ page
function initFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        if (question) {
            question.style.cursor = 'pointer';
            question.addEventListener('click', function() {
                const answer = item.querySelector('p');
                if (answer) {
                    answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
                }
            });
        }
    });
}

// Initialize FAQ toggle if on FAQ page
if (window.location.pathname.includes('faq.html')) {
    document.addEventListener('DOMContentLoaded', initFAQToggle);
}

