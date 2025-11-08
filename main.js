// Function to calculate the tip and total per person
function calculateTip() {
    const billInput = document.getElementById('text-bill');
    const peopleInput = document.getElementById('text-number-people');
	
    const tipPercentageElement = document.querySelector('.select-tip_btn-tips.active');
	
    let bill = parseFloat(billInput.value) || 0;
    let people = parseInt(peopleInput.value) || 1;
    let tipPercent = 0;
	
    if (tipPercentageElement) {
        if (tipPercentageElement.id === 'text-tip-custom') {
		
            tipPercent = parseFloat(tipPercentageElement.value) || 0;
        } else {
		
            tipPercent = parseFloat(tipPercentageElement.textContent.replace('%', '')) || 0;
        }
    }
	
    if (people === 0) {
        people = 1;
    }
	
    const totalTip = (bill * tipPercent) / 100;
	
    const tipPerPerson = totalTip / people;
	
    const totalPerPerson = (bill + totalTip) / people;
	
    document.getElementById('span-tip-amount').textContent = `$${tipPerPerson.toFixed(2)}`;
    document.getElementById('span-total-person').textContent = `$${totalPerPerson.toFixed(2)}`;
	
    const resetButton = document.getElementById('text-total-person');
    if (bill > 0 || people > 1 || tipPercent > 0) {
        resetButton.classList.add('active-reset');
    } else {
        resetButton.classList.remove('active-reset');
    }
}

document.addEventListener('DOMContentLoaded', () => {

    const billInput = document.getElementById('text-bill');
    const peopleInput = document.getElementById('text-number-people');
    const tipButtons = document.querySelectorAll('.select-tip_btn-tips');
    const customTipInput = document.getElementById('text-tip-custom');
    const resetButton = document.getElementById('text-total-person');
	
    [billInput, peopleInput, customTipInput].forEach(input => {
        input.addEventListener('input', calculateTip);
    });
	
    tipButtons.forEach(button => {
        button.addEventListener('click', (e) => {
		
            tipButtons.forEach(btn => btn.classList.remove('active'));
			
            e.target.classList.add('active');
            calculateTip();
        });
    });
	
    resetButton.addEventListener('click', (e) => {

        e.preventDefault();
        billInput.value = 0;
        peopleInput.value = 1;
	
        tipButtons.forEach(btn => btn.classList.remove('active'));
		
        customTipInput.value = 'Custom';
        calculateTip();
		
        resetButton.classList.remove('active-reset');
         
    });
	
    calculateTip();
});
