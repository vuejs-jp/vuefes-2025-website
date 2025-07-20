<script setup lang="ts">
import { definePageMeta, navigateTo, useAuth, useI18n, useLocaleRoute } from "#imports";
import {
  VFButton,
  VFSection,
  EnTicketUsageInstructions,
  JaTicketUsageInstructions,
  EnNamecardFlowAndAttentions,
  JaNamecardFlowAndAttentions,
  EnIndividualSponsor,
  JaIndividualSponsor,
} from "#components";

definePageMeta({
  middleware: () => __FEATURE_TICKET_NAMECARD__ || navigateTo("/"),
});

const { signIn, status, data } = useAuth();
const { t, locale } = useI18n();
const localeRoute = useLocaleRoute();
</script>

<template>
  <div id="pages-ticket">
    <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
    <h1>Ticket</h1>

    <VFSection :title="t('ticket.type')" class="ticket-type">
      <div class="description">
        <p>{{ t('ticket.typeDescription1') }}</p>
        <p>{{ t('ticket.typeDescription2') }}</p>
      </div>

      <section class="general-tickets">
        <ul class="general-ticket-list">
          <li class="ticket-card">
            <span class="ticket-card-title" :class="locale">{{ t('ticket.generalTicket.title') }}</span>

            <div class="ticket-card-prices">
              <span class="ticket-card-price">
                <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
                <span class="ticket-card-price-type">({{ t('ticket.early') }})</span>
                <span class="ticket-card-price-value">
                  <span class="ticket-card-price-unit" :class="locale">{{ t("ticket.priceUnit") }}</span>{{ (Number(t('ticket.generalTicket.earlyPrice'))).toLocaleString() }}
                </span>
              </span>

              <span class="ticket-card-price">
                <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
                <span class="ticket-card-price-type">({{ t('ticket.standard') }})</span>
                <span class="ticket-card-price-value">
                  <span class="ticket-card-price-unit" :class="locale">{{ t("ticket.priceUnit") }}</span>{{ (Number(t('ticket.generalTicket.standardPrice'))).toLocaleString() }}
                </span>
              </span>
            </div>
          </li>

          <li class="ticket-card">
            <span class="ticket-card-title" :class="locale">{{ t('ticket.afterPartyTicket.title') }}</span>

            <div class="ticket-card-prices">
              <span class="ticket-card-price">
                <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
                <span class="ticket-card-price-type">({{ t('ticket.early') }})</span>
                <span class="ticket-card-price-value">
                  <span class="ticket-card-price-unit" :class="locale">{{ t("ticket.priceUnit") }}</span>{{ (Number(t('ticket.afterPartyTicket.earlyPrice'))).toLocaleString() }}
                </span>
              </span>

              <span class="ticket-card-price">
                <!-- eslint-disable-next-line @intlify/vue-i18n/no-raw-text -->
                <span class="ticket-card-price-type">({{ t('ticket.standard') }})</span>
                <span class="ticket-card-price-value">
                  <span class="ticket-card-price-unit" :class="locale">{{ t("ticket.priceUnit") }}</span>{{ (Number(t('ticket.afterPartyTicket.standardPrice'))).toLocaleString() }}
                </span>
              </span>
            </div>
          </li>
        </ul>
      </section>

      <section class="option-tickets">
        <h3>{{ t('ticket.option') }}</h3>

        <ul class="option-ticket-list">
          <li>
            <div class="ticket-card">
              <span class="ticket-card-title" :class="locale">{{ t('ticket.handsOn.title') }}</span>
              <div class="ticket-card-prices">
                <span class="ticket-card-price">
                  <span class="ticket-card-price-value">
                    <span class="ticket-card-price-unit" :class="locale">{{ t("ticket.priceUnit") }}</span>{{ (Number(t('ticket.handsOn.price'))).toLocaleString() }}
                  </span>
                </span>
              </div>
            </div>
            <div class="ticket-attention">
              <p>{{ t('ticket.handsOn.attention1') }}</p>
              <i18n-t keypath="ticket.handsOn.attention2" tag="p">
                <template #about>
                  <a href="#hands-on">
                    {{ t('ticket.handsOn.about') }}
                  </a>
                </template>
              </i18n-t>
            </div>
          </li>

          <li>
            <div class="ticket-card">
              <span class="ticket-card-title" :class="locale">{{ t('ticket.individual.sponsor') }}</span>
              <div class="ticket-card-prices">
                <span class="ticket-card-price">
                  <span class="ticket-card-price-value">
                    <span class="ticket-card-price-unit" :class="locale">{{ t("ticket.priceUnit") }}</span>{{ (Number(t('ticket.individual.price'))).toLocaleString() }}
                  </span>
                </span>
              </div>
            </div>
            <div class="ticket-attention">
              <p>{{ t('ticket.individual.attention1') }}</p>
              <i18n-t keypath="ticket.individual.attention2" tag="p">
                <template #about>
                  <a href="#individual-sponsor">
                    {{ t('ticket.individual.about') }}
                  </a>
                </template>
              </i18n-t>
            </div>
          </li>
        </ul>
      </section>

      <div class="buy-ticket-button-wrapper">
        <VFButton
          class="buy-ticket-button"
          :link="
            // TODO: https://github.com/vuejs-jp/vuefes-2025/issues/693
            '/'
          "
          external
        >
          {{ t('ticket.buy') }}
        </VFButton>
      </div>

      <hr class="divider" />

      <component
        :is="locale === 'ja' ? JaTicketUsageInstructions : EnTicketUsageInstructions"
        class="ticket-usage-instructions"
      />
    </VFSection>

    <VFSection :title="t('namecard.title')" class="namecard">
      <div class="cover-image-wrapper">
        <img src="/images/ticket/namecard-cover.png" :alt="t('namecard.coverImageAlt')" />
      </div>

      <i18n-t keypath="namecard.description" tag="p" class="namecard-description">
        <template #ticketName>
          <a
            :href="
              // TODO: https://github.com/vuejs-jp/vuefes-2025/issues/693
              '/'
            "
          >
            {{ t('namecard.ticketName') }}
          </a>
        </template>
      </i18n-t>
      <p class="namecard-description">
        {{ t('namecard.deadlineDescription') }}
      </p>
      <p class="namecard-attention">
        {{ t('namecard.attention') }}
      </p>

      <div v-if="status === 'authenticated'" class="login-buttons">
        <VFButton v-if="data" :link="localeRoute({ name: 'ticket-userId', params: { userId: data.userId } })">
          {{ t('namecard.confirm') }}
        </VFButton>
      </div>

      <div v-else-if="status === 'unauthenticated'" class="login-buttons">
        <VFButton @click="signIn('google', { callbackUrl: '/ticket' })">
          {{ t('login.withGoogle') }}
        </VFButton>
        <VFButton @click="signIn('github', { callbackUrl: '/ticket' })">
          {{ t('login.withGitHub') }}
        </VFButton>
      </div>

      <hr class="divider" />

      <component
        :is="locale === 'ja' ? JaNamecardFlowAndAttentions : EnNamecardFlowAndAttentions"
        class="namecard-flow-and-attentions"
      />
    </VFSection>

    <VFSection :title="t('individualSponsor.title')" class="individual-sponsor">
      <component :is="locale === 'ja' ? JaIndividualSponsor : EnIndividualSponsor" />
    </VFSection>
  </div>
</template>

<style scoped>
@import "~/assets/styles/custom-media-query.css";

#pages-ticket {
  display: grid;
  row-gap: 1.5rem;
  @media (--mobile) {
    row-gap: 1rem;
  }

  h1 {
    font-family: "ClashDisplay-Semibold";
    font-size: 3rem;
    padding: 7.5rem 0;
    margin: 0;

    @media (--mobile) {
      padding: 2.5rem 0.75rem;
    }
  }

  .ticket-type {
    ul.general-ticket-list {
      display: grid;
      row-gap: 1.5rem;
      margin-top: 3rem;

      @media (--mobile) {
        margin-top: 2rem;
      }
    }

    ul.option-ticket-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
      column-gap: 2rem;

      @media (--mobile) {
        grid-template-columns: unset;
        row-gap: 1.5rem;
      }
    }

    .ticket-card {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-radius: var(--radius-m);
      border: 1px solid var(--color-divider);
      padding: 2rem 1.5rem;

      @media (--mobile) {
        padding: 1.25rem;
        display: block;
      }

      .ticket-card-title {
        display: block;

        &.en {
          max-width: 12rem;
        }

        @media (--mobile) {
          margin-bottom: 1.5rem;
        }
      }

      .ticket-card-prices {
        display: flex;
        gap: 2rem;

        @media (--mobile) {
          display: flex;
          flex-direction: column;
        }

        .ticket-card-price {
          display: flex;

          .ticket-card-price-type {
            display: block;
            text-align: center;
            margin-right: 0.5rem;
          }

          .ticket-card-price-value {
            font-size: 1.75rem;

            .ticket-card-price-unit {
              font-size: 1.75rem;

              &.en {
                font-size: 1.25rem;
                margin-right: 0.5rem;
              }
            }
          }
        }
      }
    }

    .ticket-attention {
      margin-top: 0.375rem;

      p, a {
        font-size: 11px;
        line-height: 15px;
        margin-bottom: 0;

        @media (--mobile) {
          font-size: 10px;
        }
      }
    }

    .buy-ticket-button-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }

    hr.divider {
      width: 100%;
      border: 0;
      border-top: 1px solid var(--color-divider);
      margin: 2rem 0;

      @media (--mobile) {
        margin: 1.5rem 0;
      }
    }

    .ticket-usage-instructions {
      :deep(ul) {
        list-style-type: disc;
        padding-left: 1.5rem;
        margin-bottom: 0;
      }
    }
  }

  .namecard {
    .cover-image-wrapper {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-bottom: 2rem;

      /* for preventing CLS */
      height: 430px;
      aspect-ratio: 538 / 430;

      @media (--mobile) {
        margin-bottom: 1.5rem;

        /* for preventing CLS */
        height: 269.35px;
        aspect-ratio: 337 / 269.35;
      }

      img {
        width: 538px;
        height: 430px;

        @media (--mobile) {
          width: 337px;
          height: 269.35px;
        }
      }
    }

    .namecard-attention {
      font-size: 14px;
      line-height: 21px;
      margin: 2rem 0;

      @media (--mobile) {
        font-size: 12px;
        line-height: 18px;
        margin: 1.5rem 0;
      }
    }

    .login-buttons {
      display: flex;
      justify-content: center;
      gap: 0.5rem;

      @media (--mobile) {
        flex-direction: column;
        align-items: center;
      }

      button {
        width: 100%;
        max-width: 300px;
      }
    }

    hr.divider {
      width: 100%;
      border: 0;
      border-top: 1px solid var(--color-divider);
      margin: 2rem 0;

      @media (--mobile) {
        margin: 1.5rem 0;
      }
    }

    .namecard-flow-and-attentions {
      :deep(ol) {
        list-style-type: decimal;
        padding-left: 1.5rem;
      }
      :deep(ul) {
        list-style-type: disc;
        padding-left: 1.5rem;
        margin-bottom: 0;
      }
    }
  }

  .individual-sponsor {
    :deep(.individual-sponsor-attention) {
      font-size: 14px;
      line-height: 21px;
      margin: 2rem 0;

      @media (--mobile) {
        font-size: 12px;
        line-height: 18px;
        margin: 1.5rem 0;
      }
    }

    :deep(hr) {
      width: 100%;
      border: 0;
      border-top: 1px solid var(--color-divider);
      margin: 2rem 0;

      @media (--mobile) {
        margin: 1.5rem 0;
      }
    }
  }
}
</style>
