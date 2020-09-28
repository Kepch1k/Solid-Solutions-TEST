class Timer {
    constructor(seconds = 20) {
        let { closeTimer } = window;
        this.startSecondsValue = seconds;
        this.secondsToClose = seconds;
        this.inProcess = false;
        this.intervalId = null;
        if (!closeTimer) {
            window.closeTimer = this;
        }
    }

    start() {
        if (this.inProcess) {
            this.stop();
        }
        let timer = document.querySelector("#timer");
        this.secondsToClose = this.startSecondsValue;
        this.inProcess = true;
        timer.innerText = this.secondsToClose;
        this.intervalId = setInterval(() => {
            --this.secondsToClose;
            timer.innerText = this.secondsToClose;
            if (this.secondsToClose <= 0) {
                let closeDeleteModalButton = document.querySelector("#CloseDeleteModalButton");
                closeDeleteModalButton.click();
                this.stop();
            }
        }, 1000);
        setTimeout(() => {
            this.stop();
        }, (+this.startSecondsValue) * 1000)
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.inProcess = false;
        }
    }
}

new Timer();